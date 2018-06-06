/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/*tabs*/
$(document).ready(function() {

    //Действия по умолчанию
    $(".tab_content").hide(); //скрыть весь контент
    $("ul.tabs li:first").addClass("active").show(); //Активировать первую вкладку
    $(".tab_content:first").show(); //Показать контент первой вкладки

    //Событие по клику
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Удалить "active" класс
        $(this).addClass("active"); //Добавить "active" для выбранной вкладки
        $(".tab_content").hide(); //Скрыть контент вкладки
        var activeTab = $(this).find("a").attr("href"); //Найти значение атрибута, чтобы определить активный таб + контент
        $(activeTab).fadeIn(); //Исчезновение активного контента
        return false;
    });

});

$(document).ready(function() {

    //Действия по умолчанию
    $(".tab_content1").hide(); //скрыть весь контент
    $("ul.tabs1 li:first").addClass("active1").show(); //Активировать первую вкладку
    $(".tab_content1:first").show(); //Показать контент первой вкладки

    //Событие по клику
    $("ul.tabs1 li").click(function() {
        $("ul.tabs1 li").removeClass("active1"); //Удалить "active" класс
        $(this).addClass("active1"); //Добавить "active" для выбранной вкладки
        $(".tab_content1").hide(); //Скрыть контент вкладки
        var activeTab = $(this).find("a").attr("href"); //Найти значение атрибута, чтобы определить активный таб + контент
        $(activeTab).fadeIn(); //Исчезновение активного контента
        return false;
    });

});


/*menu*/
$(document).ready(function() {
    $('ul#my-menu ul').each(function(i) { // Check each submenu:
        if ($.cookie('submenuMark-' + i)) {  // If index of submenu is marked in cookies:
            $(this).show().prev().removeClass('collapsed').addClass('expanded'); // Show it (add apropriate classes)
        }else {
            $(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Hide it
        }
        $(this).prev().addClass('collapsible').click(function() { // Attach an event listener
            var this_i = $('ul#my-menu ul').index($(this).next()); // The index of the submenu of the clicked link
            if ($(this).next().css('display') == 'none') {
                $(this).next().slideDown(200, function () { // Show submenu:
                    $(this).prev().removeClass('collapsed').addClass('expanded');
                    cookieSet(this_i);
                });
            }else {
                $(this).next().slideUp(200, function () { // Hide submenu:
                    $(this).prev().removeClass('expanded').addClass('collapsed');
                    cookieDel(this_i);
                    $(this).find('ul').each(function() {
                        $(this).hide(0, cookieDel($('ul#my-menu ul').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
                    });
                });
            }
            return false; // Prohibit the browser to follow the link address
        });
    });
});
function cookieSet(index) {
    $.cookie('submenuMark-' + index, 'opened', {expires: null, path: '/'}); // Set mark to cookie (submenu is shown):
}
function cookieDel(index) {
    $.cookie('submenuMark-' + index, null, {expires: null, path: '/'}); // Delete mark from cookie (submenu is hidden):
}

$(document).ready(function() {
    $('ul#my-menu1 ul').each(function(i) { // Check each submenu:
        if ($.cookie('submenuMark-' + i)) {  // If index of submenu is marked in cookies:
            $(this).show().prev().removeClass('collapsed').addClass('expanded'); // Show it (add apropriate classes)
        }else {
            $(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Hide it
        }
        $(this).prev().addClass('collapsible').click(function() { // Attach an event listener
            var this_i = $('ul#my-menu1 ul').index($(this).next()); // The index of the submenu of the clicked link
            if ($(this).next().css('display') == 'none') {
                $(this).next().slideDown(200, function () { // Show submenu:
                    $(this).prev().removeClass('collapsed').addClass('expanded');
                    cookieSet(this_i);
                });
            }else {
                $(this).next().slideUp(200, function () { // Hide submenu:
                    $(this).prev().removeClass('expanded').addClass('collapsed');
                    cookieDel(this_i);
                    $(this).find('ul').each(function() {
                        $(this).hide(0, cookieDel($('ul#my-menu1 ul').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
                    });
                });
            }
            return false; // Prohibit the browser to follow the link address
        });
    });
});
function cookieSet(index) {
    $.cookie('submenuMark-' + index, 'opened', {expires: null, path: '/'}); // Set mark to cookie (submenu is shown):
}
function cookieDel(index) {
    $.cookie('submenuMark-' + index, null, {expires: null, path: '/'}); // Delete mark from cookie (submenu is hidden):
}


$(document).ready(function() {
    $('ul#my-menu2 ul').each(function(i) { // Check each submenu:
        if ($.cookie('submenuMark-' + i)) {  // If index of submenu is marked in cookies:
            $(this).show().prev().removeClass('collapsed').addClass('expanded'); // Show it (add apropriate classes)
        }else {
            $(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Hide it
        }
        $(this).prev().addClass('collapsible').click(function() { // Attach an event listener
            var this_i = $('ul#my-menu2 ul').index($(this).next()); // The index of the submenu of the clicked link
            if ($(this).next().css('display') == 'none') {
                $(this).next().slideDown(200, function () { // Show submenu:
                    $(this).prev().removeClass('collapsed').addClass('expanded');
                    cookieSet(this_i);
                });
            }else {
                $(this).next().slideUp(200, function () { // Hide submenu:
                    $(this).prev().removeClass('expanded').addClass('collapsed');
                    cookieDel(this_i);
                    $(this).find('ul').each(function() {
                        $(this).hide(0, cookieDel($('ul#my-menu2 ul').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
                    });
                });
            }
            return false; // Prohibit the browser to follow the link address
        });
    });
});
function cookieSet(index) {
    $.cookie('submenuMark-' + index, 'opened', {expires: null, path: '/'}); // Set mark to cookie (submenu is shown):
}
function cookieDel(index) {
    $.cookie('submenuMark-' + index, null, {expires: null, path: '/'}); // Delete mark from cookie (submenu is hidden):
}
