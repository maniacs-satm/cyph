import { isPresent } from 'angular2/src/facade/lang';
import { ListWrapper, MapWrapper } from 'angular2/src/facade/collection';
export class EventListener {
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    ;
}
export class DebugNode {
    constructor(nativeNode, parent) {
        this.nativeNode = nativeNode;
        if (isPresent(parent) && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
        this.providerTokens = [];
    }
    setDebugInfo(info) {
        this.injector = info.injector;
        this.providerTokens = info.providerTokens;
        this.locals = info.locals;
        this.componentInstance = info.component;
    }
    inject(token) { return this.injector.get(token); }
    getLocal(name) { return this.locals.get(name); }
}
export class DebugElement extends DebugNode {
    constructor(nativeNode, parent) {
        super(nativeNode, parent);
        this.properties = new Map();
        this.attributes = new Map();
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    addChild(child) {
        if (isPresent(child)) {
            this.childNodes.push(child);
            child.parent = this;
        }
    }
    removeChild(child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    }
    insertChildrenAfter(child, newChildren) {
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
            var nextChildren = this.childNodes.slice(siblingIndex + 1);
            this.childNodes =
                ListWrapper.concat(ListWrapper.concat(previousChildren, newChildren), nextChildren);
            for (var i = 0; i < newChildren.length; ++i) {
                var newChild = newChildren[i];
                if (isPresent(newChild.parent)) {
                    newChild.parent.removeChild(newChild);
                }
                newChild.parent = this;
            }
        }
    }
    query(predicate) {
        var results = this.queryAll(predicate);
        return results.length > 0 ? results[0] : null;
    }
    queryAll(predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    }
    queryAllNodes(predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    }
    get children() {
        var children = [];
        this.childNodes.forEach((node) => {
            if (node instanceof DebugElement) {
                children.push(node);
            }
        });
        return children;
    }
    triggerEventHandler(eventName, eventObj) {
        this.listeners.forEach((listener) => {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    }
}
export function asNativeElements(debugEls) {
    return debugEls.map((el) => el.nativeElement);
}
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(node => {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(node => {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var _nativeNodeToDebugNode = new Map();
export function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}
export function getAllDebugNodes() {
    return MapWrapper.values(_nativeNodeToDebugNode);
}
export function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
export function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdzNEUmxYSmkudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUudHMiXSwibmFtZXMiOlsiRXZlbnRMaXN0ZW5lciIsIkV2ZW50TGlzdGVuZXIuY29uc3RydWN0b3IiLCJEZWJ1Z05vZGUiLCJEZWJ1Z05vZGUuY29uc3RydWN0b3IiLCJEZWJ1Z05vZGUuc2V0RGVidWdJbmZvIiwiRGVidWdOb2RlLmluamVjdCIsIkRlYnVnTm9kZS5nZXRMb2NhbCIsIkRlYnVnRWxlbWVudCIsIkRlYnVnRWxlbWVudC5jb25zdHJ1Y3RvciIsIkRlYnVnRWxlbWVudC5hZGRDaGlsZCIsIkRlYnVnRWxlbWVudC5yZW1vdmVDaGlsZCIsIkRlYnVnRWxlbWVudC5pbnNlcnRDaGlsZHJlbkFmdGVyIiwiRGVidWdFbGVtZW50LnF1ZXJ5IiwiRGVidWdFbGVtZW50LnF1ZXJ5QWxsIiwiRGVidWdFbGVtZW50LnF1ZXJ5QWxsTm9kZXMiLCJEZWJ1Z0VsZW1lbnQuY2hpbGRyZW4iLCJEZWJ1Z0VsZW1lbnQudHJpZ2dlckV2ZW50SGFuZGxlciIsImFzTmF0aXZlRWxlbWVudHMiLCJfcXVlcnlFbGVtZW50Q2hpbGRyZW4iLCJfcXVlcnlOb2RlQ2hpbGRyZW4iLCJnZXREZWJ1Z05vZGUiLCJnZXRBbGxEZWJ1Z05vZGVzIiwiaW5kZXhEZWJ1Z05vZGUiLCJyZW1vdmVEZWJ1Z05vZGVGcm9tSW5kZXgiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BRzNDLEVBQUMsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdDQUFnQztBQUd0RTtJQUE2QkEsWUFBbUJBLElBQVlBLEVBQVNBLFFBQWtCQTtRQUF2Q0MsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBUUE7UUFBU0EsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBVUE7SUFB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QUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JCQSxDQUFDQTtZQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDL0NBLENBQUNBO1FBQ0hBLENBQUNBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0FBQ0hBLENBQUNBO0FBRUQsc0ZBQXNGO0FBQ3RGLElBQUksc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFdkQsNkJBQTZCLFVBQWU7SUFDMUNDLE1BQU1BLENBQUNBLHNCQUFzQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7QUFDaERBLENBQUNBO0FBRUQ7SUFDRUMsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQTtBQUNuREEsQ0FBQ0E7QUFFRCwrQkFBK0IsSUFBZTtJQUM1Q0Msc0JBQXNCQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUNwREEsQ0FBQ0E7QUFFRCx5Q0FBeUMsSUFBZTtJQUN0REMsc0JBQXNCQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtBQUNqREEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJlZGljYXRlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7UmVuZGVyRGVidWdJbmZvfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXIgeyBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgY2FsbGJhY2s6IEZ1bmN0aW9uKXt9OyB9XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z05vZGUge1xuICBuYXRpdmVOb2RlOiBhbnk7XG4gIGxpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdO1xuICBwYXJlbnQ6IERlYnVnRWxlbWVudDtcbiAgcHJvdmlkZXJUb2tlbnM6IGFueVtdO1xuICBsb2NhbHM6IE1hcDxzdHJpbmcsIGFueT47XG4gIGluamVjdG9yOiBJbmplY3RvcjtcbiAgY29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBhbnksIHBhcmVudDogRGVidWdOb2RlKSB7XG4gICAgdGhpcy5uYXRpdmVOb2RlID0gbmF0aXZlTm9kZTtcbiAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkgJiYgcGFyZW50IGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBwYXJlbnQuYWRkQ2hpbGQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLnByb3ZpZGVyVG9rZW5zID0gW107XG4gIH1cblxuICBzZXREZWJ1Z0luZm8oaW5mbzogUmVuZGVyRGVidWdJbmZvKSB7XG4gICAgdGhpcy5pbmplY3RvciA9IGluZm8uaW5qZWN0b3I7XG4gICAgdGhpcy5wcm92aWRlclRva2VucyA9IGluZm8ucHJvdmlkZXJUb2tlbnM7XG4gICAgdGhpcy5sb2NhbHMgPSBpbmZvLmxvY2FscztcbiAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gaW5mby5jb21wb25lbnQ7XG4gIH1cblxuICBpbmplY3QodG9rZW46IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0b2tlbik7IH1cblxuICBnZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gdGhpcy5sb2NhbHMuZ2V0KG5hbWUpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0VsZW1lbnQgZXh0ZW5kcyBEZWJ1Z05vZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHByb3BlcnRpZXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIGF0dHJpYnV0ZXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIGNoaWxkTm9kZXM6IERlYnVnTm9kZVtdO1xuICBuYXRpdmVFbGVtZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlTm9kZTogYW55LCBwYXJlbnQ6IGFueSkge1xuICAgIHN1cGVyKG5hdGl2ZU5vZGUsIHBhcmVudCk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHRoaXMuY2hpbGROb2RlcyA9IFtdO1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IG5hdGl2ZU5vZGU7XG4gIH1cblxuICBhZGRDaGlsZChjaGlsZDogRGVidWdOb2RlKSB7XG4gICAgaWYgKGlzUHJlc2VudChjaGlsZCkpIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQoY2hpbGQ6IERlYnVnTm9kZSkge1xuICAgIHZhciBjaGlsZEluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChjaGlsZEluZGV4ICE9PSAtMSkge1xuICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5zcGxpY2UoY2hpbGRJbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaW5zZXJ0Q2hpbGRyZW5BZnRlcihjaGlsZDogRGVidWdOb2RlLCBuZXdDaGlsZHJlbjogRGVidWdOb2RlW10pIHtcbiAgICB2YXIgc2libGluZ0luZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChzaWJsaW5nSW5kZXggIT09IC0xKSB7XG4gICAgICB2YXIgcHJldmlvdXNDaGlsZHJlbiA9IHRoaXMuY2hpbGROb2Rlcy5zbGljZSgwLCBzaWJsaW5nSW5kZXggKyAxKTtcbiAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSB0aGlzLmNoaWxkTm9kZXMuc2xpY2Uoc2libGluZ0luZGV4ICsgMSk7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMgPVxuICAgICAgICAgIExpc3RXcmFwcGVyLmNvbmNhdChMaXN0V3JhcHBlci5jb25jYXQocHJldmlvdXNDaGlsZHJlbiwgbmV3Q2hpbGRyZW4pLCBuZXh0Q2hpbGRyZW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdDaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChuZXdDaGlsZC5wYXJlbnQpKSB7XG4gICAgICAgICAgbmV3Q2hpbGQucGFyZW50LnJlbW92ZUNoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdDaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHF1ZXJ5KHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4pOiBEZWJ1Z0VsZW1lbnQge1xuICAgIHZhciByZXN1bHRzID0gdGhpcy5xdWVyeUFsbChwcmVkaWNhdGUpO1xuICAgIHJldHVybiByZXN1bHRzLmxlbmd0aCA+IDAgPyByZXN1bHRzWzBdIDogbnVsbDtcbiAgfVxuXG4gIHF1ZXJ5QWxsKHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4pOiBEZWJ1Z0VsZW1lbnRbXSB7XG4gICAgdmFyIG1hdGNoZXM6IERlYnVnRWxlbWVudFtdID0gW107XG4gICAgX3F1ZXJ5RWxlbWVudENoaWxkcmVuKHRoaXMsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBxdWVyeUFsbE5vZGVzKHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnTm9kZT4pOiBEZWJ1Z05vZGVbXSB7XG4gICAgdmFyIG1hdGNoZXM6IERlYnVnTm9kZVtdID0gW107XG4gICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuKHRoaXMsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBnZXQgY2hpbGRyZW4oKTogRGVidWdFbGVtZW50W10ge1xuICAgIHZhciBjaGlsZHJlbjogRGVidWdFbGVtZW50W10gPSBbXTtcbiAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICB0cmlnZ2VyRXZlbnRIYW5kbGVyKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudE9iajogRXZlbnQpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgaWYgKGxpc3RlbmVyLm5hbWUgPT0gZXZlbnROYW1lKSB7XG4gICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrKGV2ZW50T2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNOYXRpdmVFbGVtZW50cyhkZWJ1Z0VsczogRGVidWdFbGVtZW50W10pOiBhbnkge1xuICByZXR1cm4gZGVidWdFbHMubWFwKChlbCkgPT4gZWwubmF0aXZlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihcbiAgICBlbGVtZW50OiBEZWJ1Z0VsZW1lbnQsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4sIG1hdGNoZXM6IERlYnVnRWxlbWVudFtdKSB7XG4gIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihub2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeU5vZGVDaGlsZHJlbihcbiAgICBwYXJlbnROb2RlOiBEZWJ1Z05vZGUsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnTm9kZT4sIG1hdGNoZXM6IERlYnVnTm9kZVtdKSB7XG4gIGlmIChwYXJlbnROb2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgcGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICAgIF9xdWVyeU5vZGVDaGlsZHJlbihub2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8vIE5lZWQgdG8ga2VlcCB0aGUgbm9kZXMgaW4gYSBnbG9iYWwgTWFwIHNvIHRoYXQgbXVsdGlwbGUgYW5ndWxhciBhcHBzIGFyZSBzdXBwb3J0ZWQuXG52YXIgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZSA9IG5ldyBNYXA8YW55LCBEZWJ1Z05vZGU+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWJ1Z05vZGUobmF0aXZlTm9kZTogYW55KTogRGVidWdOb2RlIHtcbiAgcmV0dXJuIF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUuZ2V0KG5hdGl2ZU5vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsRGVidWdOb2RlcygpOiBEZWJ1Z05vZGVbXSB7XG4gIHJldHVybiBNYXBXcmFwcGVyLnZhbHVlcyhfbmF0aXZlTm9kZVRvRGVidWdOb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4RGVidWdOb2RlKG5vZGU6IERlYnVnTm9kZSkge1xuICBfbmF0aXZlTm9kZVRvRGVidWdOb2RlLnNldChub2RlLm5hdGl2ZU5vZGUsIG5vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRGVidWdOb2RlRnJvbUluZGV4KG5vZGU6IERlYnVnTm9kZSkge1xuICBfbmF0aXZlTm9kZVRvRGVidWdOb2RlLmRlbGV0ZShub2RlLm5hdGl2ZU5vZGUpO1xufVxuIl19