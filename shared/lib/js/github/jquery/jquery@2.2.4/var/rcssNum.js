/* */ 
"format amd";
define( ["../var/pnum"], function( pnum ) {

return new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );

} );
