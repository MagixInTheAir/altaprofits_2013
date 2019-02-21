//GLOBAL VARIABLES
var leftButtonSelectedIndex = 1;
var centerButtonSelectedIndex = 1;
var LoadingProcedure = true;

//TO EXECUTE
$(document).ready(function(){
	init();
	window.setTimeout(hide_loading_panel, 5000);
	LoadingProcedure = false;
});

//HIDE LOADING PANEL
function hide_loading_panel() {
		$('#img_degrade').hide();
    $('#loading').slideUp();
    window.setTimeout(function() {
        $('html').get(0).style.overflow = 'visible';
    }, 500);
    window.setTimeout(show_left_border, 500);  
}

//ANIMATE AT THE END OF LOADING
function show_left_border() {
    $("#left_border").toggle("slide", {direction: "left"});
    $("#img_degrade").toggle("slide", {direction: "right"});
}

//HIDE IMAGE PANEL
function hide_image_panel() {
    var img_src = $("#center-img").attr("src");
    $('#show-image').slideUp();
    $('#center_img').remove();
    $('#image-background').slideUp();
    $("img").each(function() {
        if($(this).attr("src") == img_src) {
            $(this).slideDown(1000);
        }
    });
}

//SHOW IMAGE PANEL
function show_image_panel(index) {
    var addAfterMe = $('#show-image');
    var imgSrc = $($('img').get(index)).attr('src');
    var toAdd = '<img src="' + imgSrc + '" id="center_img" />';
    $(toAdd).appendTo(addAfterMe);
    $('#show-image').slideDown();
    $('#image-background').slideDown();
    
    $('html, body').animate({
               'scrollTop':   $($('img').get(index+1)).offset().top-100
           }, 1000);
}

//INIT
function init() {
    create_left_buttons();
    init_image_panel();     
}

//INIT IMAGE PANEL
function init_image_panel() {
    $('#show-image #close-button').click(function() {hide_image_panel()});
    $('img').each(function() {$(this).click(function(e) {
    if($(this).attr("src") != "media/images/close.png") {
           for(var i = 0; i < $('img').length; i++) {
              if(e.currentTarget == $('img').get(i)) {
                 var imageIndex = i;
             }
          }
          show_image_panel(imageIndex);
          }
        });
    });
}
//CREATE_LEFT_BUTTONS
function create_left_buttons() {
                var Elements = $('#part_titles .part_title');
                var addAfterMe = $('#links');
                Elements.each(function(){
                        var link_href = $(this).text().toLowerCase().replace(/\s/g,"_").replace(/[éè]/g, "e");
                        var link_name = $(this).text();
                        var toAdd = '<div class="part_link_container"><span class="part_link"">'+link_name+'</span></div>';
                        
                        $(toAdd).appendTo(addAfterMe);
	            });   
                
                
                $('.part_link').each(function () {
                            $(this).click(function(e) {
                                for (var i = 0; i < $('.part_link').length; i++) {
                                    if(e.currentTarget == $('.part_link').get(i)) {
                                        var buttonIndex = i;
                                    }
                                }
		                        on_left_button_click(buttonIndex);
                            });
                });
on_left_button_click(0);   
}

//UPDATE_CENTER_BUTTONS
function update_center_buttons(index) {
                $('.sub_part_link').each(function(){$(this).remove();});
                $('.sub_part_link_container').each(function(){$(this).remove();});
                var LeftButtonSelectedText = $($('.part_title').get(index)).text().toLowerCase().replace(/\s/g, '_').replace(/[éè]/g, "e");
                var Elements = $('#sub_part_titles .'+LeftButtonSelectedText);
                var addAfterMe = $('#center_buttons');
                Elements.each(function(){
                        var link_href = $(this).text().toLowerCase().replace(/\s/g,"_").replace(/[éè]/g, "e");
                        var link_name = $(this).text();
                        var toAdd = '<div class="sub_part_link_container"><span class="sub_part_link">'+link_name+'</span></div>';
                        
                        $(toAdd).appendTo(addAfterMe);
	                });

                    
                $('.sub_part_link').each(function () {
                            $(this).click(function(e) {
                                for (var i = 0; i < $('.sub_part_link').length; i++) {
                                    if(e.currentTarget == $('.sub_part_link').get(i)) {
                                        var buttonIndex = i;
                                    }
                                }
		                        on_center_button_click(buttonIndex, false);
                            });
                });

	on_center_button_click(0, true);
}

//ON_CENTER_BUTTON_CLICK
function on_center_button_click(index, changeLeftButton) {
	if(centerButtonSelectedIndex != index || changeLeftButton == true)
	{
		activate_center_button(index);
		update_paragraphs(index);
		centerButtonSelectedIndex = index;
	}
}

//ON_LEFT_BUTTON_CLICK
function on_left_button_click(index) {
$('html, body').animate({
               'scrollTop':   0
           }, 1000, function(){
if(leftButtonSelectedIndex != index)
	{
		update_center_buttons(index);
		activate_left_button(index);
		leftButtonSelectedIndex = index;
	}
});
	
}

//UPDATE_PARAGRAPHS
function update_paragraphs(index) {
    $('#parts .part, #part_titles .part_title, #sub_part_titles .sub_part_title').each(function(){$(this).hide(500);});
window.setTimeout(function() {
    $('.'+$($('.sub_part_link').get(index)).text().toLowerCase().replace(/[\s\']/g, '_').replace(/[éè]/g, "e")).show(500);
}, 500)
$(".img_container").css("height", "auto");
}

//ACTIVATE_LEFT_BUTTON
function activate_left_button(index) {
    var i = 0;
    $('.part_link').each(function(){
		if(i == index) {
			$(this).parent().animate({
				'background-color': 'rgb(246, 83, 0)',
			}, 500);
			$(this).animate({
				'color': 'white',
			}, 500);

			$(this).css({
				'text-decoration':'none'
			});
			buttonText = $(this).text();

		} else {
			$(this).parent().animate({
				'background-color':'white',
			}, 500);
			$(this).animate({

				'color': 'rgb(0, 123, 189)',
			});
			$(this).css({
				'text-decoration':'underline'

			});
		}
		i++;
	});
    
    var addAfterMe = $('#logo');
    var toAdd = '<span id="main_title">'+buttonText+'</span>';
	if(LoadingProcedure != true) {
	$('#img_degrade').hide("slide", {direction: "right"}, 500);
	window.setTimeout(function() {$('#main_title').remove();$(toAdd).appendTo(addAfterMe);}, 500);
	$('#img_degrade').show("slide", {direction: "right"}, 500);
	} else {
	$(toAdd).appendTo(addAfterMe);
	}
    var className = '.'+buttonText.toLowerCase().replace(/[\s\']/g, '_').replace(/[éè]/g, "e");
    $('.part_description').each(function(){$(this).hide(500);});
    $('#part_descriptions '+className).each(function(){$(this).show(500);});
}

//ACTIVATE_CENTER_BUTTON
function activate_center_button(index) {
    var fleche = $('#fleche');
    var linkYPos = $($('.sub_part_link').get(index)).position().left;
    var linkWidth = $($('.sub_part_link').get(index)).width();
    var position = linkYPos + (linkWidth/2);
    fleche.animate({'left':position}, 1000, 'easeOutBack');
}

