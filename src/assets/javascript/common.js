$(document).ready(() => {
  $('.menuSelector').on('click', (ev) => {
    hide('.contents');
    show('.' + ev.target.attributes.name.value);
  });
});

function hide(ele){
  $(ele).css('display', 'none');
}

function show(ele){
  $(ele).css('display', 'block');
}
