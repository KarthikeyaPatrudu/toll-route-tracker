An error occurred in the <ForwardRef(ContainerComponent)> component.

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
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13067
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<ForwardRef(ContainerComponent)>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ RealtimeMapTest.jsx:145
RealtimeMapTest @ RealtimeMapTest.jsx:140
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
<RealtimeMapTest>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:36
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
chunk-KWUSAO3B.js?v=d12f4965:5081 Uncaught TypeError: Cannot read properties of undefined (reading 'createIcon')
    at NewClass._initIcon (chunk-KWUSAO3B.js?v=d12f4965:5081:36)
    at NewClass.onAdd (chunk-KWUSAO3B.js?v=d12f4965:5011:16)
    at NewClass._layerAdd (chunk-KWUSAO3B.js?v=d12f4965:4454:16)
    at NewClass.whenReady (chunk-KWUSAO3B.js?v=d12f4965:2981:22)
    at NewClass.addLayer (chunk-KWUSAO3B.js?v=d12f4965:4475:16)
    at addLayer (react-leaflet.js?v=d12f4965:237:15)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18567:20)
    at runWithFiberInDEV (react-dom_client.js?v=d12f4965:997:72)
    at commitHookEffectListMount (react-dom_client.js?v=d12f4965:9411:163)
    at commitHookPassiveMountEffects (react-dom_client.js?v=d12f4965:9465:60)
_initIcon @ chunk-KWUSAO3B.js?v=d12f4965:5081
onAdd @ chunk-KWUSAO3B.js?v=d12f4965:5011
_layerAdd @ chunk-KWUSAO3B.js?v=d12f4965:4454
whenReady @ chunk-KWUSAO3B.js?v=d12f4965:2981
addLayer @ chunk-KWUSAO3B.js?v=d12f4965:4475
addLayer @ react-leaflet.js?v=d12f4965:237
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18567
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
commitHookEffectListMount @ react-dom_client.js?v=d12f4965:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=d12f4965:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=d12f4965:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=d12f4965:11066
flushPassiveEffects @ react-dom_client.js?v=d12f4965:13150
flushPendingEffects @ react-dom_client.js?v=d12f4965:13088
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13062
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13067
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<ForwardRef(ContainerComponent)>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ RealtimeMapTest.jsx:145
RealtimeMapTest @ RealtimeMapTest.jsx:140
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
<RealtimeMapTest>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:36
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
RealtimeMapTest.jsx:145 An error occurred in the <ForwardRef(ContainerComponent)> component.

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
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13067
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<ForwardRef(ContainerComponent)>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
(anonymous) @ RealtimeMapTest.jsx:145
RealtimeMapTest @ RealtimeMapTest.jsx:140
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
<RealtimeMapTest>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:36
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
chunk-KWUSAO3B.js?v=d12f4965:1762 Uncaught TypeError: Cannot read properties of undefined (reading '_leaflet_events')
    at removeOne (chunk-KWUSAO3B.js?v=d12f4965:1762:26)
    at off (chunk-KWUSAO3B.js?v=d12f4965:1708:15)
    at NewClass._removeIcon (chunk-KWUSAO3B.js?v=d12f4965:5138:13)
    at NewClass.onRemove (chunk-KWUSAO3B.js?v=d12f4965:5023:16)
    at NewClass.removeLayer (chunk-KWUSAO3B.js?v=d12f4965:4486:19)
    at NewClass.removeFrom (chunk-KWUSAO3B.js?v=d12f4965:4418:17)
    at NewClass.remove (chunk-KWUSAO3B.js?v=d12f4965:4408:23)
    at NewClass.remove (chunk-KWUSAO3B.js?v=d12f4965:2498:29)
    at react-leaflet.js?v=d12f4965:559:20
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d12f4965:18573:13)
removeOne @ chunk-KWUSAO3B.js?v=d12f4965:1762
off @ chunk-KWUSAO3B.js?v=d12f4965:1708
_removeIcon @ chunk-KWUSAO3B.js?v=d12f4965:5138
onRemove @ chunk-KWUSAO3B.js?v=d12f4965:5023
removeLayer @ chunk-KWUSAO3B.js?v=d12f4965:4486
removeFrom @ chunk-KWUSAO3B.js?v=d12f4965:4418
remove @ chunk-KWUSAO3B.js?v=d12f4965:4408
remove @ chunk-KWUSAO3B.js?v=d12f4965:2498
(anonymous) @ react-leaflet.js?v=d12f4965:559
react_stack_bottom_frame @ react-dom_client.js?v=d12f4965:18573
runWithFiberInDEV @ react-dom_client.js?v=d12f4965:997
commitHookEffectListUnmount @ react-dom_client.js?v=d12f4965:9449
commitHookPassiveUnmountEffects @ react-dom_client.js?v=d12f4965:9468
commitPassiveUnmountEffectsInsideOfDeletedTree_begin @ react-dom_client.js?v=d12f4965:11593
recursivelyTraversePassiveUnmountEffects @ react-dom_client.js?v=d12f4965:11465
commitPassiveUnmountOnFiber @ react-dom_client.js?v=d12f4965:11498
flushPassiveEffects @ react-dom_client.js?v=d12f4965:13146
flushPendingEffects @ react-dom_client.js?v=d12f4965:13088
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13062
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performSyncWorkOnRoot @ react-dom_client.js?v=d12f4965:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d12f4965:13414
flushSpawnedWork @ react-dom_client.js?v=d12f4965:13067
commitRoot @ react-dom_client.js?v=d12f4965:12804
commitRootWhenReady @ react-dom_client.js?v=d12f4965:12016
performWorkOnRoot @ react-dom_client.js?v=d12f4965:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d12f4965:13505
performWorkUntilDeadline @ react-dom_client.js?v=d12f4965:36
<ForwardRef(MapContainerComponent)>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
RealtimeMapTest @ RealtimeMapTest.jsx:126
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
<RealtimeMapTest>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d12f4965:247
App @ App.jsx:36
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
RealtimeMapTest.jsx:126 An error occurred in the <ForwardRef(MapContainerComponent)> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.
