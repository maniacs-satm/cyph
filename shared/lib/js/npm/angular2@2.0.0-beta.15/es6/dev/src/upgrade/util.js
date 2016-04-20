/* */ 
"format esm";
export function stringify(obj) {
    if (typeof obj == 'function')
        return obj.name || obj.toString();
    return '' + obj;
}
export function onError(e) {
    // TODO: (misko): We seem to not have a stack trace here!
    console.log(e, e.stack);
    throw e;
}
export function controllerKey(name) {
    return '$' + name + 'Controller';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtb1hETzRwMnYudG1wL2FuZ3VsYXIyL3NyYy91cGdyYWRlL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsMEJBQTBCLEdBQVE7SUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLENBQUM7QUFHRCx3QkFBd0IsQ0FBTTtJQUM1Qix5REFBeUQ7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxDQUFDO0FBQ1YsQ0FBQztBQUVELDhCQUE4QixJQUFZO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIG9iai5uYW1lIHx8IG9iai50b1N0cmluZygpO1xuICByZXR1cm4gJycgKyBvYmo7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3IoZTogYW55KSB7XG4gIC8vIFRPRE86IChtaXNrbyk6IFdlIHNlZW0gdG8gbm90IGhhdmUgYSBzdGFjayB0cmFjZSBoZXJlIVxuICBjb25zb2xlLmxvZyhlLCBlLnN0YWNrKTtcbiAgdGhyb3cgZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xsZXJLZXkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuICckJyArIG5hbWUgKyAnQ29udHJvbGxlcic7XG59XG4iXX0=