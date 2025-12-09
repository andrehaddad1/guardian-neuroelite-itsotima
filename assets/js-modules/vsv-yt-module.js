import StickyBtnPurchaseNotifier from './StickyBtnPurchaseNotifier.js';
import initVideoScripts from './ytb-video.js';
import activateExitPop from './exit-intent-handler.js';
import runDiscountTimer from './timer.js';

export default function (revealSecs = 0, initialDatc = true) {
    const datcEl = document.getElementsByTagName('main')[0]
    const yt = initVideoScripts()
    const revealBtn = document.getElementsByClassName('play-video')[0]
    let exitNtBar

    window.addEventListener('popup:show', () => {
        yt.pauseCurrentPlayer()
    })

    if (revealBtn) {
        revealBtn.addEventListener('click', function (e) {
            e.preventDefault()
            yt.playCurrentPlayer()
        })
    }

    if (datcEl?.classList.contains('hidden')) {
        exitNtBar = activateExitPop({
            popupID: 'exit-nt-bar',
            delay: 0,
            extraDelayTime: 0,
            maxAttempts: 1,
            offerTimer: 120,
            overflowHidden: false
        })

        window.addEventListener('datc:finished', () => {
            activateDelayedFeatures()
        })

       if(initialDatc) {
           setTimeout(() => {
               datcEl.classList.remove('hidden')
               activateDelayedFeatures()
           }, 1000 * revealSecs)
       }
    } else {
        activateDelayedFeatures()
    }

    function activateDelayedFeatures() {
        const stickyBtnEl = document.getElementById('stickyBuyBtn');
        const stickyTriggerEl = document.getElementById('sticky-buy-trigger');
        const purchaseNotifierSectionEls = Array.from(document.querySelectorAll('.atc-box__item.active'));
        const purchaseNotifierEl = document.getElementById('purchaseNotifier');
        const promoVideoEl = document.getElementById('promo-video');

        if (!stickyBtnEl || !stickyTriggerEl || !purchaseNotifierEl || purchaseNotifierSectionEls.length === 0) {
            console.warn('Required elements for StickyBtnPurchaseNotifier not found');
            return;
        }

        exitNtBar && exitNtBar.deactivate()
        activateExitPop({
            popupID: 'exit-intent',
            delay: 60,
            extraDelayTime: 20,
            maxAttempts: 2,
            offerTimer: 120,
            blockedPopupId: 'pre-purchase-popup'
        })
        const stickyNotifierInstance = StickyBtnPurchaseNotifier({
            stickyBtnEl,
            stickyTriggerEl,
            purchaseNotifierEl,
            promoVideoEl,
            purchaseNotifierSectionEls,
            // optional: customize throttle intervals:
            // scrollThrottleMs: 300,
            // resizeThrottleMs: 200
        })

        const timerElements = document.querySelectorAll('.timer-box .timer');
        timerElements.forEach(element => {
            const duration = parseInt(element.dataset.duration) || 30;
            runDiscountTimer(element, duration);
        });

        const prePurchasePop = document.getElementById('pre-purchase-popup')
        const prePurchaseBtns = document.getElementsByClassName('pre-purchase')
        if (prePurchasePop) {
            const prePurchasePopCloseBtn = prePurchasePop.getElementsByClassName('close-modal')[0]

            for (let prePurchaseBtn of prePurchaseBtns) {
                prePurchaseBtn.addEventListener('click', function (e) {
                    e.preventDefault()
                    if (!prePurchasePop) {
                        window.location(prePurchaseBtn.getAttribute('href'))
                        return false
                    }

                    prePurchasePop.classList.add('active')
                    prePurchasePopCloseBtn.addEventListener('click', function () {
                        prePurchasePop.classList.remove('active')
                    }, false)
                })
            }
        }
    }
}