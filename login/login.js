import { elementsGetter } from '../lib/elementsGetter.js';
import { addInputsEventListeners } from '../lib/utils.js';

const formInputs = elementsGetter('login');

addInputsEventListeners(formInputs);
