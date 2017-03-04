/**
 * @desc string utility function.
 * 
 * 
 * 참고: 한글은 바로 multibyte 문자열 형식으로 취급된다. 즉, 한글 1 글자의 길이는 3이 아닌 1 이다.
 * 
 */

/**
 * 
 * 문자열의 앞부분을 잘라서 리턴한는데, 자르고자 하는 부분(length)가 단어 중간이라면, 그 단어가 끝나고 난 다음 공백에 자른다.
 * 
 * 맨 끝에 padding 을 추가해서 리턴한다.
 * 
 * 
 * @code
      let ko = "가 가나 가나다라마바사아자차카타파하. 이것은 한글 문자입니다. 글 자르기 테스트입니다.";
      console.log( cut_by_space( ko, 29, '...') );
 * @endcode
 * 
 */
export function cut_by_space( str: string, length: number, padding: string = '' ) {

    if ( ! str ) return '';
    if ( str.length <= length ) return str;
    
    let pos = str.indexOf( ' ', length - 1 );
    if ( pos == -1 ) return str;

    return str.slice( 0, pos ) + padding;

}

/**
 * 문자열의 앞 부분을 잘라서 리턴한다. 단어의 중간이라도 잘라서 리턴한다.
 * 
 * 맨 끝에 padding 을 추가해서 리턴한다.
 * 
 */
export function cut( str: string, length: number, padding: string = '' ) {
    
    if ( ! str ) return '';
    if ( str.length <= length ) return str;
    
    return str.slice( 0, length ) + padding;
}


/**
 * 
 * 
 * @param arr 
 * @param n 
 * 
 * @code
 *      console.log( array_chunk( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 2 ) );
 * @result
 *      [
 *          [ 1, 2 ],
 *          [ 3, 4 ],
 *          [ 7, 8 ],
 *          [ 9 ]
 *      ]
 * @endcode
 * 
 * @return Array
 *          - new array.
 *          - if the param 'arr' is not an array, it returns [].
 */
export function array_chunk( arr, n ) {
    if ( ! Array.isArray( arr ) ) return [];
    return arr.reduce( ( total, val, index ) => {
        const chunk_index = Math.floor( index / n );
        if ( ! total[ chunk_index ] ) total[ chunk_index ] = [];
        total[ chunk_index ].push( val );
        return total;
    }, []);
}


/**
 * 
 */
export function is_cordova() {
    if ( !! window['cordova'] ) return true;
    if ( document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1 ) return true;
    return false;
}