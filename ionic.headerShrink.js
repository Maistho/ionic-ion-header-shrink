/* globals ionic */
angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            var y = 0;
            var prevY = 0;
            var scrollDelay = 0.4;

            var fadeAmt;

            var header = $document[0].body.querySelector('.search-bar');
            var headerHeight = header.offsetHeight;

            function onScroll(e) {
                var scrollTop = e.detail.scrollTop;

                if (scrollTop >= 0) {
                    y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
                } else {
                    y = 0;
                }
                console.log(scrollTop);

                ionic.requestAnimationFrame(function() {
                    fadeAmt = 1 - (y / headerHeight);
                    header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
                    for (var i = 0, j = header.children.length; i < j; i++) {
                        header.children[i].style.opacity = fadeAmt;
                    }
                });

                prevY = scrollTop;
            }

            $element.bind('scroll', onScroll);
        }
    };
}]);
