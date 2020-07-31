import TreadmillsContainer from './TreadmillsContainer.js';

$(document).ready(() => {
    const rm = new TreadmillsContainer('.running-machines__container');
    console.log(rm);

    rm.new();
    rm.new();

    $('#add').click(rm.new.bind(rm));
})