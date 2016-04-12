'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var template_ast_1 = require('./template_ast');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
function createChangeDetectorDefinitions(componentType, componentStrategy, genConfig, parsedTemplate) {
    var pvVisitors = [];
    var visitor = new ProtoViewVisitor(null, pvVisitors, componentStrategy);
    template_ast_1.templateVisitAll(visitor, parsedTemplate);
    return createChangeDefinitions(pvVisitors, componentType, genConfig);
}
exports.createChangeDetectorDefinitions = createChangeDetectorDefinitions;
var ProtoViewVisitor = (function () {
    function ProtoViewVisitor(parent, allVisitors, strategy) {
        this.parent = parent;
        this.allVisitors = allVisitors;
        this.strategy = strategy;
        this.nodeCount = 0;
        this.boundElementCount = 0;
        this.variableNames = [];
        this.bindingRecords = [];
        this.eventRecords = [];
        this.directiveRecords = [];
        this.viewIndex = allVisitors.length;
        allVisitors.push(this);
    }
    ProtoViewVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
        this.nodeCount++;
        this.boundElementCount++;
        template_ast_1.templateVisitAll(this, ast.outputs);
        for (var i = 0; i < ast.directives.length; i++) {
            ast.directives[i].visit(this, i);
        }
        var childVisitor = new ProtoViewVisitor(this, this.allVisitors, change_detection_1.ChangeDetectionStrategy.Default);
        // Attention: variables present on an embedded template count towards
        // the embedded template and not the template anchor!
        template_ast_1.templateVisitAll(childVisitor, ast.vars);
        template_ast_1.templateVisitAll(childVisitor, ast.children);
        return null;
    };
    ProtoViewVisitor.prototype.visitElement = function (ast, context) {
        this.nodeCount++;
        if (ast.isBound()) {
            this.boundElementCount++;
        }
        template_ast_1.templateVisitAll(this, ast.inputs, null);
        template_ast_1.templateVisitAll(this, ast.outputs);
        template_ast_1.templateVisitAll(this, ast.exportAsVars);
        for (var i = 0; i < ast.directives.length; i++) {
            ast.directives[i].visit(this, i);
        }
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    ProtoViewVisitor.prototype.visitNgContent = function (ast, context) { return null; };
    ProtoViewVisitor.prototype.visitVariable = function (ast, context) {
        this.variableNames.push(ast.name);
        return null;
    };
    ProtoViewVisitor.prototype.visitEvent = function (ast, directiveRecord) {
        var bindingRecord = lang_1.isPresent(directiveRecord) ?
            change_detection_1.BindingRecord.createForHostEvent(ast.handler, ast.fullName, directiveRecord) :
            change_detection_1.BindingRecord.createForEvent(ast.handler, ast.fullName, this.boundElementCount - 1);
        this.eventRecords.push(bindingRecord);
        return null;
    };
    ProtoViewVisitor.prototype.visitElementProperty = function (ast, directiveRecord) {
        var boundElementIndex = this.boundElementCount - 1;
        var dirIndex = lang_1.isPresent(directiveRecord) ? directiveRecord.directiveIndex : null;
        var bindingRecord;
        if (ast.type === template_ast_1.PropertyBindingType.Property) {
            bindingRecord = lang_1.isPresent(dirIndex) ?
                change_detection_1.BindingRecord.createForHostProperty(dirIndex, ast.value, ast.name) :
                change_detection_1.BindingRecord.createForElementProperty(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Attribute) {
            bindingRecord = lang_1.isPresent(dirIndex) ?
                change_detection_1.BindingRecord.createForHostAttribute(dirIndex, ast.value, ast.name) :
                change_detection_1.BindingRecord.createForElementAttribute(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Class) {
            bindingRecord = lang_1.isPresent(dirIndex) ?
                change_detection_1.BindingRecord.createForHostClass(dirIndex, ast.value, ast.name) :
                change_detection_1.BindingRecord.createForElementClass(ast.value, boundElementIndex, ast.name);
        }
        else if (ast.type === template_ast_1.PropertyBindingType.Style) {
            bindingRecord = lang_1.isPresent(dirIndex) ?
                change_detection_1.BindingRecord.createForHostStyle(dirIndex, ast.value, ast.name, ast.unit) :
                change_detection_1.BindingRecord.createForElementStyle(ast.value, boundElementIndex, ast.name, ast.unit);
        }
        this.bindingRecords.push(bindingRecord);
        return null;
    };
    ProtoViewVisitor.prototype.visitAttr = function (ast, context) { return null; };
    ProtoViewVisitor.prototype.visitBoundText = function (ast, context) {
        var nodeIndex = this.nodeCount++;
        this.bindingRecords.push(change_detection_1.BindingRecord.createForTextNode(ast.value, nodeIndex));
        return null;
    };
    ProtoViewVisitor.prototype.visitText = function (ast, context) {
        this.nodeCount++;
        return null;
    };
    ProtoViewVisitor.prototype.visitDirective = function (ast, directiveIndexAsNumber) {
        var directiveIndex = new change_detection_1.DirectiveIndex(this.boundElementCount - 1, directiveIndexAsNumber);
        var directiveMetadata = ast.directive;
        var outputsArray = [];
        collection_1.StringMapWrapper.forEach(ast.directive.outputs, function (eventName, dirProperty) { return outputsArray.push([dirProperty, eventName]); });
        var directiveRecord = new change_detection_1.DirectiveRecord({
            directiveIndex: directiveIndex,
            callAfterContentInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentInit) !== -1,
            callAfterContentChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentChecked) !== -1,
            callAfterViewInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewInit) !== -1,
            callAfterViewChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewChecked) !== -1,
            callOnChanges: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnChanges) !== -1,
            callDoCheck: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.DoCheck) !== -1,
            callOnInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnInit) !== -1,
            callOnDestroy: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnDestroy) !== -1,
            changeDetection: directiveMetadata.changeDetection,
            outputs: outputsArray
        });
        this.directiveRecords.push(directiveRecord);
        template_ast_1.templateVisitAll(this, ast.inputs, directiveRecord);
        var bindingRecords = this.bindingRecords;
        if (directiveRecord.callOnChanges) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnChanges(directiveRecord));
        }
        if (directiveRecord.callOnInit) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnInit(directiveRecord));
        }
        if (directiveRecord.callDoCheck) {
            bindingRecords.push(change_detection_1.BindingRecord.createDirectiveDoCheck(directiveRecord));
        }
        template_ast_1.templateVisitAll(this, ast.hostProperties, directiveRecord);
        template_ast_1.templateVisitAll(this, ast.hostEvents, directiveRecord);
        template_ast_1.templateVisitAll(this, ast.exportAsVars);
        return null;
    };
    ProtoViewVisitor.prototype.visitDirectiveProperty = function (ast, directiveRecord) {
        // TODO: these setters should eventually be created by change detection, to make
        // it monomorphic!
        var setter = reflection_1.reflector.setter(ast.directiveName);
        this.bindingRecords.push(change_detection_1.BindingRecord.createForDirective(ast.value, ast.directiveName, setter, directiveRecord));
        return null;
    };
    return ProtoViewVisitor;
})();
function createChangeDefinitions(pvVisitors, componentType, genConfig) {
    var pvVariableNames = _collectNestedProtoViewsVariableNames(pvVisitors);
    return pvVisitors.map(function (pvVisitor) {
        var id = componentType.name + "_" + pvVisitor.viewIndex;
        return new change_detection_1.ChangeDetectorDefinition(id, pvVisitor.strategy, pvVariableNames[pvVisitor.viewIndex], pvVisitor.bindingRecords, pvVisitor.eventRecords, pvVisitor.directiveRecords, genConfig);
    });
}
function _collectNestedProtoViewsVariableNames(pvVisitors) {
    var nestedPvVariableNames = collection_1.ListWrapper.createFixedSize(pvVisitors.length);
    pvVisitors.forEach(function (pv) {
        var parentVariableNames = lang_1.isPresent(pv.parent) ? nestedPvVariableNames[pv.parent.viewIndex] : [];
        nestedPvVariableNames[pv.viewIndex] = parentVariableNames.concat(pv.variableNames);
    });
    return nestedPvVariableNames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RlZmluaXRpb25fZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUHZPdVJqdngudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9jaGFuZ2VfZGVmaW5pdGlvbl9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbImNyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMiLCJQcm90b1ZpZXdWaXNpdG9yIiwiUHJvdG9WaWV3VmlzaXRvci5jb25zdHJ1Y3RvciIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRFbWJlZGRlZFRlbXBsYXRlIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEVsZW1lbnQiLCJQcm90b1ZpZXdWaXNpdG9yLnZpc2l0TmdDb250ZW50IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdFZhcmlhYmxlIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEV2ZW50IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEVsZW1lbnRQcm9wZXJ0eSIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRBdHRyIiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdEJvdW5kVGV4dCIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXRUZXh0IiwiUHJvdG9WaWV3VmlzaXRvci52aXNpdERpcmVjdGl2ZSIsIlByb3RvVmlld1Zpc2l0b3IudmlzaXREaXJlY3RpdmVQcm9wZXJ0eSIsImNyZWF0ZUNoYW5nZURlZmluaXRpb25zIiwiX2NvbGxlY3ROZXN0ZWRQcm90b1ZpZXdzVmFyaWFibGVOYW1lcyJdLCJtYXBwaW5ncyI6IkFBQUEsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0UscUJBQWlDLDBCQUEwQixDQUFDLENBQUE7QUFDNUQsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEUsaUNBQXdKLHFEQUFxRCxDQUFDLENBQUE7QUFHOU0sNkJBQWtRLGdCQUFnQixDQUFDLENBQUE7QUFDblIsMkJBQTZCLHFDQUFxQyxD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SUEsU0FBU0EsQ0FBQ0EsU0FBV0EsQ0FBQ0E7UUFDeERBLE1BQU1BLENBQUNBLElBQUlBLDJDQUF3QkEsQ0FDL0JBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLGNBQWNBLEVBQ3RGQSxTQUFTQSxDQUFDQSxZQUFZQSxFQUFFQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO0lBRXJFQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNMQSxDQUFDQTtBQUVELCtDQUErQyxVQUE4QjtJQUMzRUMsSUFBSUEscUJBQXFCQSxHQUFlQSx3QkFBV0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDdkZBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLEVBQUVBO1FBQ3BCQSxJQUFJQSxtQkFBbUJBLEdBQ25CQSxnQkFBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EscUJBQXFCQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUMzRUEscUJBQXFCQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxtQkFBbUJBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO0lBQ3JGQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNIQSxNQUFNQSxDQUFDQSxxQkFBcUJBLENBQUNBO0FBQy9CQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4LCBCaW5kaW5nUmVjb3JkLCBEaXJlY3RpdmVSZWNvcmQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24sIENoYW5nZURldGVjdG9yR2VuQ29uZmlnLCBBU1RXaXRoU291cmNlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuXG5pbXBvcnQge0NvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZVR5cGVNZXRhZGF0YX0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0IHtUZW1wbGF0ZUFzdCwgRWxlbWVudEFzdCwgQm91bmRUZXh0QXN0LCBQcm9wZXJ0eUJpbmRpbmdUeXBlLCBEaXJlY3RpdmVBc3QsIFRlbXBsYXRlQXN0VmlzaXRvciwgdGVtcGxhdGVWaXNpdEFsbCwgTmdDb250ZW50QXN0LCBFbWJlZGRlZFRlbXBsYXRlQXN0LCBWYXJpYWJsZUFzdCwgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsIEJvdW5kRXZlbnRBc3QsIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIEF0dHJBc3QsIFRleHRBc3R9IGZyb20gJy4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3N9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMoXG4gICAgY29tcG9uZW50VHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSwgY29tcG9uZW50U3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIGdlbkNvbmZpZzogQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsIHBhcnNlZFRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdKTogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uW10ge1xuICB2YXIgcHZWaXNpdG9ycyA9IFtdO1xuICB2YXIgdmlzaXRvciA9IG5ldyBQcm90b1ZpZXdWaXNpdG9yKG51bGwsIHB2VmlzaXRvcnMsIGNvbXBvbmVudFN0cmF0ZWd5KTtcbiAgdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yLCBwYXJzZWRUZW1wbGF0ZSk7XG4gIHJldHVybiBjcmVhdGVDaGFuZ2VEZWZpbml0aW9ucyhwdlZpc2l0b3JzLCBjb21wb25lbnRUeXBlLCBnZW5Db25maWcpO1xufVxuXG5jbGFzcyBQcm90b1ZpZXdWaXNpdG9yIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgdmlld0luZGV4OiBudW1iZXI7XG4gIG5vZGVDb3VudDogbnVtYmVyID0gMDtcbiAgYm91bmRFbGVtZW50Q291bnQ6IG51bWJlciA9IDA7XG4gIHZhcmlhYmxlTmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGJpbmRpbmdSZWNvcmRzOiBCaW5kaW5nUmVjb3JkW10gPSBbXTtcbiAgZXZlbnRSZWNvcmRzOiBCaW5kaW5nUmVjb3JkW10gPSBbXTtcbiAgZGlyZWN0aXZlUmVjb3JkczogRGlyZWN0aXZlUmVjb3JkW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBwYXJlbnQ6IFByb3RvVmlld1Zpc2l0b3IsIHB1YmxpYyBhbGxWaXNpdG9yczogUHJvdG9WaWV3VmlzaXRvcltdLFxuICAgICAgcHVibGljIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSkge1xuICAgIHRoaXMudmlld0luZGV4ID0gYWxsVmlzaXRvcnMubGVuZ3RoO1xuICAgIGFsbFZpc2l0b3JzLnB1c2godGhpcyk7XG4gIH1cblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgdGhpcy5ib3VuZEVsZW1lbnRDb3VudCsrO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0Lm91dHB1dHMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0LmRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFzdC5kaXJlY3RpdmVzW2ldLnZpc2l0KHRoaXMsIGkpO1xuICAgIH1cblxuICAgIHZhciBjaGlsZFZpc2l0b3IgPVxuICAgICAgICBuZXcgUHJvdG9WaWV3VmlzaXRvcih0aGlzLCB0aGlzLmFsbFZpc2l0b3JzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0KTtcbiAgICAvLyBBdHRlbnRpb246IHZhcmlhYmxlcyBwcmVzZW50IG9uIGFuIGVtYmVkZGVkIHRlbXBsYXRlIGNvdW50IHRvd2FyZHNcbiAgICAvLyB0aGUgZW1iZWRkZWQgdGVtcGxhdGUgYW5kIG5vdCB0aGUgdGVtcGxhdGUgYW5jaG9yIVxuICAgIHRlbXBsYXRlVmlzaXRBbGwoY2hpbGRWaXNpdG9yLCBhc3QudmFycyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbChjaGlsZFZpc2l0b3IsIGFzdC5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgaWYgKGFzdC5pc0JvdW5kKCkpIHtcbiAgICAgIHRoaXMuYm91bmRFbGVtZW50Q291bnQrKztcbiAgICB9XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaW5wdXRzLCBudWxsKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5vdXRwdXRzKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5leHBvcnRBc1ZhcnMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0LmRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFzdC5kaXJlY3RpdmVzW2ldLnZpc2l0KHRoaXMsIGkpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdFZhcmlhYmxlKGFzdDogVmFyaWFibGVBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52YXJpYWJsZU5hbWVzLnB1c2goYXN0Lm5hbWUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogYW55IHtcbiAgICB2YXIgYmluZGluZ1JlY29yZCA9IGlzUHJlc2VudChkaXJlY3RpdmVSZWNvcmQpID9cbiAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0RXZlbnQoYXN0LmhhbmRsZXIsIGFzdC5mdWxsTmFtZSwgZGlyZWN0aXZlUmVjb3JkKSA6XG4gICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRXZlbnQoYXN0LmhhbmRsZXIsIGFzdC5mdWxsTmFtZSwgdGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDEpO1xuICAgIHRoaXMuZXZlbnRSZWNvcmRzLnB1c2goYmluZGluZ1JlY29yZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IGFueSB7XG4gICAgdmFyIGJvdW5kRWxlbWVudEluZGV4ID0gdGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDE7XG4gICAgdmFyIGRpckluZGV4ID0gaXNQcmVzZW50KGRpcmVjdGl2ZVJlY29yZCkgPyBkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXggOiBudWxsO1xuICAgIHZhciBiaW5kaW5nUmVjb3JkO1xuICAgIGlmIChhc3QudHlwZSA9PT0gUHJvcGVydHlCaW5kaW5nVHlwZS5Qcm9wZXJ0eSkge1xuICAgICAgYmluZGluZ1JlY29yZCA9IGlzUHJlc2VudChkaXJJbmRleCkgP1xuICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdFByb3BlcnR5KGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lKSA6XG4gICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFbGVtZW50UHJvcGVydHkoYXN0LnZhbHVlLCBib3VuZEVsZW1lbnRJbmRleCwgYXN0Lm5hbWUpO1xuICAgIH0gZWxzZSBpZiAoYXN0LnR5cGUgPT09IFByb3BlcnR5QmluZGluZ1R5cGUuQXR0cmlidXRlKSB7XG4gICAgICBiaW5kaW5nUmVjb3JkID0gaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0QXR0cmlidXRlKGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lKSA6XG4gICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFbGVtZW50QXR0cmlidXRlKGFzdC52YWx1ZSwgYm91bmRFbGVtZW50SW5kZXgsIGFzdC5uYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFzdC50eXBlID09PSBQcm9wZXJ0eUJpbmRpbmdUeXBlLkNsYXNzKSB7XG4gICAgICBiaW5kaW5nUmVjb3JkID0gaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0Q2xhc3MoZGlySW5kZXgsIGFzdC52YWx1ZSwgYXN0Lm5hbWUpIDpcbiAgICAgICAgICBCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRDbGFzcyhhc3QudmFsdWUsIGJvdW5kRWxlbWVudEluZGV4LCBhc3QubmFtZSk7XG4gICAgfSBlbHNlIGlmIChhc3QudHlwZSA9PT0gUHJvcGVydHlCaW5kaW5nVHlwZS5TdHlsZSkge1xuICAgICAgYmluZGluZ1JlY29yZCA9IGlzUHJlc2VudChkaXJJbmRleCkgP1xuICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdFN0eWxlKGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lLCBhc3QudW5pdCkgOlxuICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudFN0eWxlKGFzdC52YWx1ZSwgYm91bmRFbGVtZW50SW5kZXgsIGFzdC5uYW1lLCBhc3QudW5pdCk7XG4gICAgfVxuICAgIHRoaXMuYmluZGluZ1JlY29yZHMucHVzaChiaW5kaW5nUmVjb3JkKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB2YXIgbm9kZUluZGV4ID0gdGhpcy5ub2RlQ291bnQrKztcbiAgICB0aGlzLmJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVGb3JUZXh0Tm9kZShhc3QudmFsdWUsIG5vZGVJbmRleCkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy5ub2RlQ291bnQrKztcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5kZXhBc051bWJlcjogbnVtYmVyKTogYW55IHtcbiAgICB2YXIgZGlyZWN0aXZlSW5kZXggPSBuZXcgRGlyZWN0aXZlSW5kZXgodGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDEsIGRpcmVjdGl2ZUluZGV4QXNOdW1iZXIpO1xuICAgIHZhciBkaXJlY3RpdmVNZXRhZGF0YSA9IGFzdC5kaXJlY3RpdmU7XG4gICAgdmFyIG91dHB1dHNBcnJheSA9IFtdO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgICAgYXN0LmRpcmVjdGl2ZS5vdXRwdXRzLFxuICAgICAgICAoZXZlbnROYW1lOiBzdHJpbmcsIGRpclByb3BlcnR5OiBzdHJpbmcpID0+IG91dHB1dHNBcnJheS5wdXNoKFtkaXJQcm9wZXJ0eSwgZXZlbnROYW1lXSkpO1xuICAgIHZhciBkaXJlY3RpdmVSZWNvcmQgPSBuZXcgRGlyZWN0aXZlUmVjb3JkKHtcbiAgICAgIGRpcmVjdGl2ZUluZGV4OiBkaXJlY3RpdmVJbmRleCxcbiAgICAgIGNhbGxBZnRlckNvbnRlbnRJbml0OlxuICAgICAgICAgIGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50SW5pdCkgIT09IC0xLFxuICAgICAgY2FsbEFmdGVyQ29udGVudENoZWNrZWQ6XG4gICAgICAgICAgZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5BZnRlckNvbnRlbnRDaGVja2VkKSAhPT0gLTEsXG4gICAgICBjYWxsQWZ0ZXJWaWV3SW5pdDpcbiAgICAgICAgICBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0luaXQpICE9PSAtMSxcbiAgICAgIGNhbGxBZnRlclZpZXdDaGVja2VkOlxuICAgICAgICAgIGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuQWZ0ZXJWaWV3Q2hlY2tlZCkgIT09IC0xLFxuICAgICAgY2FsbE9uQ2hhbmdlczogZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5PbkNoYW5nZXMpICE9PSAtMSxcbiAgICAgIGNhbGxEb0NoZWNrOiBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkRvQ2hlY2spICE9PSAtMSxcbiAgICAgIGNhbGxPbkluaXQ6IGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuT25Jbml0KSAhPT0gLTEsXG4gICAgICBjYWxsT25EZXN0cm95OiBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLk9uRGVzdHJveSkgIT09IC0xLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBkaXJlY3RpdmVNZXRhZGF0YS5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICBvdXRwdXRzOiBvdXRwdXRzQXJyYXlcbiAgICB9KTtcbiAgICB0aGlzLmRpcmVjdGl2ZVJlY29yZHMucHVzaChkaXJlY3RpdmVSZWNvcmQpO1xuXG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaW5wdXRzLCBkaXJlY3RpdmVSZWNvcmQpO1xuICAgIHZhciBiaW5kaW5nUmVjb3JkcyA9IHRoaXMuYmluZGluZ1JlY29yZHM7XG4gICAgaWYgKGRpcmVjdGl2ZVJlY29yZC5jYWxsT25DaGFuZ2VzKSB7XG4gICAgICBiaW5kaW5nUmVjb3Jkcy5wdXNoKEJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlT25DaGFuZ2VzKGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aXZlUmVjb3JkLmNhbGxPbkluaXQpIHtcbiAgICAgIGJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVEaXJlY3RpdmVPbkluaXQoZGlyZWN0aXZlUmVjb3JkKSk7XG4gICAgfVxuICAgIGlmIChkaXJlY3RpdmVSZWNvcmQuY2FsbERvQ2hlY2spIHtcbiAgICAgIGJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVEaXJlY3RpdmVEb0NoZWNrKGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5ob3N0UHJvcGVydGllcywgZGlyZWN0aXZlUmVjb3JkKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5ob3N0RXZlbnRzLCBkaXJlY3RpdmVSZWNvcmQpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmV4cG9ydEFzVmFycyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eShhc3Q6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogYW55IHtcbiAgICAvLyBUT0RPOiB0aGVzZSBzZXR0ZXJzIHNob3VsZCBldmVudHVhbGx5IGJlIGNyZWF0ZWQgYnkgY2hhbmdlIGRldGVjdGlvbiwgdG8gbWFrZVxuICAgIC8vIGl0IG1vbm9tb3JwaGljIVxuICAgIHZhciBzZXR0ZXIgPSByZWZsZWN0b3Iuc2V0dGVyKGFzdC5kaXJlY3RpdmVOYW1lKTtcbiAgICB0aGlzLmJpbmRpbmdSZWNvcmRzLnB1c2goXG4gICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRGlyZWN0aXZlKGFzdC52YWx1ZSwgYXN0LmRpcmVjdGl2ZU5hbWUsIHNldHRlciwgZGlyZWN0aXZlUmVjb3JkKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVDaGFuZ2VEZWZpbml0aW9ucyhcbiAgICBwdlZpc2l0b3JzOiBQcm90b1ZpZXdWaXNpdG9yW10sIGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgZ2VuQ29uZmlnOiBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyk6IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbltdIHtcbiAgdmFyIHB2VmFyaWFibGVOYW1lcyA9IF9jb2xsZWN0TmVzdGVkUHJvdG9WaWV3c1ZhcmlhYmxlTmFtZXMocHZWaXNpdG9ycyk7XG4gIHJldHVybiBwdlZpc2l0b3JzLm1hcChwdlZpc2l0b3IgPT4ge1xuICAgIHZhciBpZCA9IGAke2NvbXBvbmVudFR5cGUubmFtZX1fJHtwdlZpc2l0b3Iudmlld0luZGV4fWA7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24oXG4gICAgICAgIGlkLCBwdlZpc2l0b3Iuc3RyYXRlZ3ksIHB2VmFyaWFibGVOYW1lc1twdlZpc2l0b3Iudmlld0luZGV4XSwgcHZWaXNpdG9yLmJpbmRpbmdSZWNvcmRzLFxuICAgICAgICBwdlZpc2l0b3IuZXZlbnRSZWNvcmRzLCBwdlZpc2l0b3IuZGlyZWN0aXZlUmVjb3JkcywgZ2VuQ29uZmlnKTtcblxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NvbGxlY3ROZXN0ZWRQcm90b1ZpZXdzVmFyaWFibGVOYW1lcyhwdlZpc2l0b3JzOiBQcm90b1ZpZXdWaXNpdG9yW10pOiBzdHJpbmdbXVtdIHtcbiAgdmFyIG5lc3RlZFB2VmFyaWFibGVOYW1lczogc3RyaW5nW11bXSA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShwdlZpc2l0b3JzLmxlbmd0aCk7XG4gIHB2VmlzaXRvcnMuZm9yRWFjaCgocHYpID0+IHtcbiAgICB2YXIgcGFyZW50VmFyaWFibGVOYW1lczogc3RyaW5nW10gPVxuICAgICAgICBpc1ByZXNlbnQocHYucGFyZW50KSA/IG5lc3RlZFB2VmFyaWFibGVOYW1lc1twdi5wYXJlbnQudmlld0luZGV4XSA6IFtdO1xuICAgIG5lc3RlZFB2VmFyaWFibGVOYW1lc1twdi52aWV3SW5kZXhdID0gcGFyZW50VmFyaWFibGVOYW1lcy5jb25jYXQocHYudmFyaWFibGVOYW1lcyk7XG4gIH0pO1xuICByZXR1cm4gbmVzdGVkUHZWYXJpYWJsZU5hbWVzO1xufVxuIl19