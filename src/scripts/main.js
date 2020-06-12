
'use strict';

import "core-js";
//import "regenerator-runtime/runtime";
import MAccordion from './MAccordion';

function Main(e)
{
    window.maccordion = new MAccordion();

} // Main


function OnLoaded(e)
{
    window.maccordion.Init();

} // OnLoaded


window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );
