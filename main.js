(function($) {
	var button = $('button');
	var envelope = $('.envelope');
	var flipped = false;

	function pullOut() {

		return new TimelineMax()
			.to('.flap', 1, {
				rotationX: 180,
				ease: Power1.easeInOut
			}, 'scaleBack')
			.to('.invitation', 1, {
				scale: 0.8,
				ease: Power4.easeInOut,
			}, 'scaleBack')
			.set('.flap', {
				zIndex: 0
			})
			.to('.card', 1, {
				y: '0%',
				scaleY: 1.2,
				ease: Circ.easeInOut,
			})
			.set('.mask', {
				//- Change overflow on mask
				overflow: 'visible',
				onComplete: function() {
					//- Change Z-Index on Pseudo element
					envelope.toggleClass('is-open');
				}
			})
			.to('.card', 1.3, {
				y: '100%',
				scaleY: 1,
				ease: Circ.easeInOut,
			}, 'moveDown')
			.to('button', 1, {
				y: '180px',
				ease: Circ.easeInOut,
				onComplete: () => {
					$('.arshad')[0].style['z-index'] = 3001;
					$('.arshad')[0].classList.add('animated', 'heartBeat')
					toggleText()
					setTimeout(() => {
					$('.arshad')[0].style['z-index'] = 1;
					}, 2000)
				}
			}, 'moveDown+=0.15');
	}

	function toggleFlip() {

		if (!envelope.hasClass('is-open')) {
			return;
		}

		var ry = (!flipped) ? 180 : 0;
		flipped = (!flipped) ? true : false;

		TweenMax.to('.card', 1, {
			rotationY: ry,
			ease: Power4.easeInOut,
			onComplete: toggleText
		});
	}

	function toggleText() {
		var text = !flipped ? 'See behind!' : 'Woohoo !!!';
		button.toggleClass('invert', !flipped).text(text);
	}

	button.one('click', pullOut);

	button.on('click', toggleFlip);
		
}(jQuery));