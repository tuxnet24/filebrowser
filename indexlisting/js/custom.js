(function($) {

	var props = {
		width: '26px',
		mode: 'light'
	};

	// Set the current year on the copyrigth text
	var set_copyrightyear = function() {
		var currendyear = new Date().getFullYear();
		if ($('.copyrightyear').length>0) {
			var pageyear=$('.copyrightyear').html();
			if (currendyear != pageyear) {
				$('.copyrightyear').html(pageyear + " - " + currendyear);
			}
		}
	};

	// Toggle between dark/light mode
	var toggle_theme = function() {

		if ($('body').hasClass('dark')) {
			$('body').addClass('light');
			$('body').removeClass('dark');
			createCookie("color",'light');
		} else {
			$('body').addClass('dark');
			$('body').removeClass('light');
			createCookie("color",'dark');
		}

	};

	// we can now rely on $ within the safety of our "bodyguard" function
	// http://codeimpossible.com/2010/01/13/solving-document-ready-is-not-a-function-and-other-problems/
	$(document).ready(function() {

		// Display modal
        $('#myModal').on('shown.bs.modal', function () {
          $('#myInput').focus()
        });

		// Toggle dark/light theme
		$(".modeswitch").click(function() {
			toggle_theme();
		});

		// create cookie, if not exists or read cookie
		if (!checkCookie('color')) {
			createCookie("color", props.mode);
		} else {
			props.mode = readCookie('color');
		}

		// Hide navbar li on click
		$('.navbar-nav>li>a').on('click', function(){
			$('.navbar-collapse').collapse('hide');
		});

		// Reset body class
		$('body').removeClass();
		$('body').addClass(props.mode);

		$('.content table').attr('class', 'table table-hover table-responsive');
		$('.content table tr th:nth-child(1):not([colspan])').attr('style', 'width:'+props.width+';');
		$('.content table tr th:nth-child(2)').attr('class', 'col-md-4');
		$('.content table tr th:nth-child(3)').attr('class', 'hidden-xs col-md-2 text-right');
		$('.content table tr th:nth-child(4)').attr('class', 'hidden-xs col-md-2 text-right');
		$('.content table tr th:nth-child(5)').attr('class', 'hidden-xs col-md-4');
		$('.content table tr th[colspan="5"]').attr('style', 'height:5px;display:none;');

		$('.content table tr td:nth-child(1):not([colspan])').attr('style', 'width:'+props.width+';');
		$('.content table tr td:nth-child(2)').attr('class', 'col-md-4');
		$('.content table tr td:nth-child(3)').attr('class', 'hidden-xs col-md-2');
		$('.content table tr td:nth-child(4)').attr('class', 'hidden-xs col-md-2');
		$('.content table tr td:nth-child(5)').attr('class', 'hidden-xs col-md-4');

		set_copyrightyear();

	});

})(jQuery);

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function cookieExistsAndNotBlank(input) {return /^(.*;)?\s*cookie1\s*=\s*[^;]/.test(input);}

function checkCookie(name) {
	var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? true : false;
}
function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
