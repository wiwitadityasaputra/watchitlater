/// <reference path="../../../typings/tsd.d.ts" />

module angularApp {
	"use strict";
	
	export interface AppRootScope extends angular.IRootScopeService {
		showNavbar: boolean;
	}
	

	function appRun($rootScope: AppRootScope) {
		
		startScrollListener();
		
		function startScrollListener(): void {
			var docElem = document.documentElement;
			var didScroll = false;
			var changeHeaderOn = 300;

			window.addEventListener('scroll', function(event) {
				if (!didScroll) {
					didScroll = true;
					setTimeout(scrollPage, 250);
				}
			}, false);

			function scrollPage() {
				var sy = scrollY();
				if (sy >= 300) {
					$rootScope.$apply(function() {
						$rootScope.showNavbar = true;
					});
				} else {
					$rootScope.$apply(function() {
						$rootScope.showNavbar = false;
					});
				}

				didScroll = false;
			}

			function scrollY() {
				return window.pageYOffset || docElem.scrollTop;
			}
		}
	}

	angular.module('app').run(appRun);
}