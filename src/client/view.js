import render from 'view-engine'
import template from './template'

/*
  render a view object
 */

export default function(view, callback) {
    return template(view.template, function(template) {
        var result = render(template, view.data);
        callback(result);
    })
}
