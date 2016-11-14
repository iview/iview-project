/**
 * Created by aresn on 16/7/4.
 */
/**
* 千位分隔符
* */
export default function (value) {
    return value.toString().replace(/\B(?=(\d{3})+$)/g,',');
}