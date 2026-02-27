Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
DashboardPage.jsx?t=1772193222017:403 Uncaught ReferenceError: Car is not defined
    at DashboardPage.jsx?t=1772193222017:403:38
    at Array.map (<anonymous>)
    at DashboardPage (DashboardPage.jsx?t=1772193222017:395:66)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18509:20)
    at renderWithHooks (react-dom_client.js?v=d12f4965:5654:24)
    at updateFunctionComponent (react-dom_client.js?v=d12f4965:7475:21)
    at beginWork (react-dom_client.js?v=d12f4965:8525:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at performUnitOfWork (react-dom_client.js?v=d12f4965:12561:98)
    at workLoopSync (react-dom_client.js?v=d12f4965:12424:43)
(anonymous) @ DashboardPage.jsx?t=1772193222017:403
DashboardPage @ DashboardPage.jsx?t=1772193222017:395
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11827
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<DashboardPage>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:16
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ main.jsx:15Understand this error
App.jsx:16 An error occurred in the <DashboardPage> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966
logUncaughtError @ react-dom_client.js?v=d12f4965:7020
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
lane.callback @ react-dom_client.js?v=d12f4965:7048
callCallback @ react-dom_client.js?v=d12f4965:5491
commitCallbacks @ react-dom_client.js?v=d12f4965:5503
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:999
commitLayoutEffectOnFiber @ react-dom_client.js?v=d12f4965:9976
flushLayoutEffects @ react-dom_client.js?v=d12f4965:12924
commitRoot @ react-dom_client.js?v=d12f4965:12803
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<DashboardPage>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:16
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ main.jsx:15Understand this warning
DashboardPage.jsx:159 Uncaught ReferenceError: Activity is not defined
    at DashboardPage (DashboardPage.jsx:159:8)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18509:20)
    at renderWithHooks (react-dom_client.js?v=d12f4965:5654:24)
    at updateFunctionComponent (react-dom_client.js?v=d12f4965:7475:21)
    at beginWork (react-dom_client.js?v=d12f4965:8525:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at performUnitOfWork (react-dom_client.js?v=d12f4965:12561:98)
    at workLoopSync (react-dom_client.js?v=d12f4965:12424:43)
    at renderRootSync (react-dom_client.js?v=d12f4965:12408:13)
    at performWorkOnRoot (react-dom_client.js?v=d12f4965:11827:37)
DashboardPage @ DashboardPage.jsx:159
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11827
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSyncWork$1 @ react-dom_client.js?v=d12f4965:12076
scheduleRefresh @ react-dom_client.js?v=d12f4965:372
(anonymous) @ @react-refresh:228
performReactRefresh @ @react-refresh:217
(anonymous) @ @react-refresh:604
<DashboardPage>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:16
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11766
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSyncWork$1 @ react-dom_client.js?v=d12f4965:12076
scheduleRoot @ react-dom_client.js?v=d12f4965:360
(anonymous) @ @react-refresh:208
performReactRefresh @ @react-refresh:190
(anonymous) @ @react-refresh:604
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ main.jsx:15Understand this error
@react-refresh:228 An error occurred in the <DashboardPage> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=d12f4965:6966
logUncaughtError @ react-dom_client.js?v=d12f4965:7020
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
lane.callback @ react-dom_client.js?v=d12f4965:7048
callCallback @ react-dom_client.js?v=d12f4965:5491
commitCallbacks @ react-dom_client.js?v=d12f4965:5503
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:999
commitLayoutEffectOnFiber @ react-dom_client.js?v=d12f4965:9976
flushLayoutEffects @ react-dom_client.js?v=d12f4965:12924
commitRoot @ react-dom_client.js?v=d12f4965:12803
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSyncWork$1 @ react-dom_client.js?v=d12f4965:12076
scheduleRefresh @ react-dom_client.js?v=d12f4965:372
(anonymous) @ @react-refresh:228
performReactRefresh @ @react-refresh:217
(anonymous) @ @react-refresh:604
<DashboardPage>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:16
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18509
renderWithHooks @ react-dom_client.js?v=d12f4965:5654
updateFunctionComponent @ react-dom_client.js?v=d12f4965:7475
beginWork @ react-dom_client.js?v=d12f4965:8525
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
performUnitOfWork @ react-dom_client.js?v=d12f4965:12561
workLoopSync @ react-dom_client.js?v=d12f4965:12424
renderRootSync @ react-dom_client.js?v=d12f4965:12408
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11766
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSyncWork$1 @ react-dom_client.js?v=d12f4965:12076
scheduleRoot @ react-dom_client.js?v=d12f4965:360
(anonymous) @ @react-refresh:208
performReactRefresh @ @react-refresh:190
(anonymous) @ @react-refresh:604
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ main.jsx:15Understand this warning
