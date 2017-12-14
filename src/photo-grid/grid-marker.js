import $ from 'jquery'
import _ from 'underscore'
import {part} from './linear-partition'




function GridMaker(options){
	var defaultOptions = {
		idealHeight: parseInt(window.innerHeight / 3),
		spacer: 8,
		itemClass: 'photo',
		itemTmpl: '<div></div>',
		$container: $('.photo-grid__photos-container'),
		isExcludeScrollBar: true,
		isIgnoreBodyScroll: false,
		$parent: $("body"),
		events: {}
	}
	this.options = $.extend(true,defaultOptions, options);
}
GridMaker.prototype = (function(){
	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	};
	var V_SCROLL_BAR_WIDTH = getScrollBarWidth();
	function isScrollBarVisible($elmt){
		if(this.options.$parent.is("body")){
			return this.options.$parent.height() > $(window).height();
		}
		return $elmt.get(0).scrollHeight > $elmt.get(0).clientHeight ;
	}
	function renderItem(photo, viewportWidth, summedRatios, rows){
		var imageInfo = {};
		var respect = rows < 1 ? 'height' : undefined;
		var dimension = calculateImageDimension.call(this, viewportWidth, this.options.idealHeight, summedRatios, photo.ar, respect);
		photo.w = dimension.w;
		photo.h = dimension.h;
		photo.margin = this.options.spacer;
		var uid = new Date().getTime() + Math.random();
		console.log(uid);
		photo.uid = uid;
	}
	function calculateImageDimension(viewportWidth, idealHeight, summedRatios, ar, respect){
		var dimension = {};
		if(respect === "height"){

			dimension.h = idealHeight;
			dimension.w = parseInt(idealHeight * ar - 2*this.options.spacer);
		} else {
			dimension.w = parseInt(viewportWidth/ summedRatios * ar - 2*this.options.spacer);
			dimension.h = parseInt(viewportWidth / summedRatios - 2*this.options.spacer);
		}
		return dimension;
		
	}
	function reset(){
		if(this.options.height){
			this.options.$container.css("height", "auto");
		}
		this.options.$container.empty();
		
	}
	function calculateViewportWidth(photos){
		var self = this;
		var padding = 0;
		try{
			var paddingLeft = self.options.$container.css("padding-left").split("px")[0];
			var paddingRight = self.options.$container.css("padding-right").split("px")[0];
	 		padding = (paddingLeft ? parseInt(paddingLeft) : 0) + (paddingRight ? parseInt(paddingRight) : 0);
		}catch(ex){
			padding = 0;
		}
		var viewportWidth = self.options.$container[0].getBoundingClientRect().width - padding;
		if(viewportWidth < 0 ) return;
		if(isScrollBarVisible.call(this, self.options.$container)){
			if($("body").css("over-flow") === "hidden"){
				return viewportWidth - V_SCROLL_BAR_WIDTH;
			}
			return viewportWidth ;
		}
		var summedRatios;
		var sumHeight = 0;
		var summed_width = photos.reduce((function(sum, p) {
	  		return sum += p.ar * self.options.idealHeight;
		}), 0);
		var rows = Math.round(summed_width / viewportWidth);

		summedRatios = photos.reduce((function(sum, p) {
	  		return sum += p.ar;
		}), 0);
		if(rows < 1){
			sumHeight = parseInt(viewportWidth / summedRatios - 2*this.options.spacer);
		} else{
			var weights = photos.map(function(p) {
				return parseInt(p.ar * 100);
			});
			var partition = part(weights, rows);

			var index = 0;
			var rowBuffer = [];
			var imageInfo = {};
			var rowHeight = 0;
			for (var i = 0; i < partition.length; i++) {
				rowBuffer = [];
				for (var j = 0; j<partition[i].length; j++) {
					rowBuffer.push(photos[index++])
				}
				summedRatios = rowBuffer.reduce((function(sum, p) {
					return sum += p.ar;
				}), 0);
				rowHeight = parseInt(viewportWidth / summedRatios - 2*this.options.spacer) + 2*this.options.spacer;
				sumHeight += rowHeight;
			}
		}
		this.options.$container.append('<div id="pixerf-photo-grid" style="height: ' +  sumHeight  +  'px">' + '</div>');
		if(this.options.height && photos.length > 0){
			this.options.$container.css("height", this.options.height);
		}
		if(isScrollBarVisible.call(this, this.options.$container)){
			$("#pixerf-photo-grid").remove();
			return viewportWidth - V_SCROLL_BAR_WIDTH;
		}
		$("#pixerf-photo-grid").remove();
		
		return viewportWidth ;
	}
	function generate(photos){
		var self = this;
		var viewportWidth = calculateViewportWidth.call(this, photos);
		var summedRatios;
		var summed_width = photos.reduce((function(sum, p) {
	  		return sum += p.ar * self.options.idealHeight;
		}), 0);
		var rows = Math.round(summed_width / viewportWidth);

		summedRatios = photos.reduce((function(sum, p) {
	  		return sum += p.ar;
		}), 0);
		if(rows < 1){
			for (var i  = 0; i < photos.length; i ++){
				renderItem.call(this, photos[i], viewportWidth, summedRatios, rows);
			}
			return ;
		} 
		var weights = photos.map(function(p) {
			return parseInt(p.ar * 100);
		});
		var partition = part(weights, rows);

		var index = 0;
		var rowBuffer = [];
		var imageInfo = {};
		for (var i = 0; i < partition.length; i++) {
			rowBuffer = [];
			for (var j = 0; j<partition[i].length; j++) {
				rowBuffer.push(photos[index++])
			}
			summedRatios = rowBuffer.reduce((function(sum, p) {
		  		return sum += p.ar;
			}), 0);
			for (var k = 0; k<rowBuffer.length; k++) {
				var photo = rowBuffer[k];
				renderItem.call(this, photo,  viewportWidth, summedRatios, rows);
		  	}
		}
	}
	return {
		generate: generate,
		reset: reset
	}
})();
export default GridMaker;