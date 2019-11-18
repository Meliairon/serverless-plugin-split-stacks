'use strict';

module.exports = class Reference {
    constructor(resourceId, details) {
        this.id = resourceId;
        Object.assign(this, details);
    }

    getDependencyName() {
        if (typeof this.value === 'object' && this.value) {
            if ('Fn::GetAtt' in this.value) {
                const getAtt = this.value['Fn::GetAtt'];

                return this.normalize(
                    Array.isArray(getAtt)
                        ? getAtt.join('')
                        : getAtt
                );
            }
            else if ('Fn::Sub' in this.value) {
                const getSub = this.value['Fn::Sub'];
                if (getSub.includes(".")) {

                    return this.normalize(
                        Array.isArray(getSub)
                            ? getSub.join('')
                            : getSub
                    );
                }
            }
        }
        return this.id;
    }

    replace(newValue) {
        this.parent[this.key] = newValue;
    }

    normalize(value) {
        return value.replace(/[^a-zA-Z0-9]*/gi, '');
    }

};
