
export default class MAccordion
{
    constructor()
    {
        this.options            = {};
        this.options.sel        = "data-macc";
        this.options.sel_title  = "data-macc-title";
        this.options.processed  = "data-macc-processed";
        this.options.cls_active = "active";
        this.options.is_multi   = false;
    
    } // constructor


    // @public
    SelectEl( _el )
    {
        this._ProcessEl( _el );

    } // SelectEl


    // @public
    Init( new_options = null )
    {
        let _options  = Object.assign( this.options, new_options || this.options );
        let _all_acc  = [];
        let _acc_dict = [];

        _all_acc = Array.from( document.querySelectorAll( `[${_options.sel}]:not([${_options.processed}])` ) );

        _all_acc.forEach((_el)=>
        {
            let _grp = _el.attributes[_options.sel].value;
            if( !_acc_dict.includes(_grp) )
            {
                _acc_dict.push(_grp);
                _acc_dict[_grp]         = Object.create(null);
                _acc_dict[_grp].accs    = [];
                _acc_dict[_grp].options = _options;
            }

            _acc_dict[_grp].accs.push(_el);

            _el._loop        = _acc_dict[_grp];
            _el._loop_title  = _el.querySelector( "["+_options.sel_title+"]" );
            _el._loop_height = _el.offsetHeight;

            _el.setAttribute( _options.processed, "" );
            _el.style["height"] = _el._loop_title.offsetHeight + "px";

            _el.addEventListener( "click", this._OnBtn(_el) );
        });

    } // Init


    // @private
    _OnBtn(_el)
    {
        return function(e)
        {
            e.preventDefault();

            window.maccordion._ProcessEl( this );
        }

    } // _OnBtn


    // @private
    _ProcessEl( _el )
    {
        let _loop    = _el._loop;
        let _options = _loop.options;

        if( !_options.is_multi )
        {
            _el._loop.accs.forEach((_el2)=>
            {
                if( _el !== _el2 )
                {
                    _el2.classList.remove(_options.cls_active);
                    _el2.style["height"] = _el2._loop_title.offsetHeight + "px";
                }
            });
        }

        _el.classList.toggle( _options.cls_active );

        if( _el.classList.contains(_options.cls_active) )
        {
            _el.style["height"] = _el._loop_height + "px";
        }
        else
        {
            _el.style["height"] = _el._loop_title.offsetHeight + "px";
        }

    } // _ProcessEl

} // class MAccordion
