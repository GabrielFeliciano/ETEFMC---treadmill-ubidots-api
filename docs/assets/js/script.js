import RunningMachinesContainer from './RunningMachineContainer.js';

$(document).ready(() => {
    const rm = new RunningMachinesContainer('.running-machines__container');
    console.log(rm);

    rm.new();
    rm.new();

    $('#add').click(rm.new.bind(rm));
})