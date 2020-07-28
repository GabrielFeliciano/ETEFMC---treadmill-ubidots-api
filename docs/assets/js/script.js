import RunningMachinesContainer from './RunningMachine.js';

$(document).ready(() => {
    const rm = new RunningMachinesContainer('.running-machines__container');

    rm.new();
    rm.new();

    $('#add').click(rm.new.bind(rm));
})