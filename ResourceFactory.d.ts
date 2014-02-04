import Resource = require('./Resource');
interface ResourceFactory {
    create(url: string, user: string, pw: string): Resource;
}
export = ResourceFactory;
