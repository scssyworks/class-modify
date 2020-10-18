type Subscription = {
    unsubscribe(): void;
};

export class ClassList {
    #classList: string[] = [];
    #callbacks: ((classString: string) => void)[] = [];
    enabledLogs = true;
    constructor(...classStrings: string[]) {
        classStrings.forEach(classString => {
            const classList = classString.split(' ').filter(className => !!className.trim());
            classList.forEach(className => {
                if (!this.#classList.includes(className)) {
                    this.#classList.push(className);
                }
            });
        });
    }
    #callCallbacks = (): void => {
        this.#callbacks.forEach(cb => {
            cb(this.toString());
        });
    }
    add(className: string): ClassList {
        if (typeof className !== 'string') {
            this.enabledLogs && console.error('Class name should be a string.');
        } else if (!this.#classList.includes(className)) {
            this.#classList.push(className);
        }
        this.#callCallbacks();
        return this;
    }
    remove(className: string): ClassList {
        if (typeof className !== 'string') {
            this.enabledLogs && console.error('Class name should be a string.');
        } else if (this.#classList.includes(className)) {
            this.#classList.splice(this.#classList.indexOf(className), 1);
        }
        this.#callCallbacks();
        return this;
    }
    toggle(className: string): ClassList {
        if (this.#classList.includes(className)) {
            this.remove(className);
        } else {
            this.add(className);
        }
        return this;
    }
    toString(): string {
        return this.#classList.join(' ');
    }
    subscribe(cb: (classString: string) => void): Subscription {
        this.#callbacks.push(cb);
        return {
            unsubscribe: () => {
                this.#callbacks.splice(this.#callbacks.indexOf(cb), 1);
            }
        };
    }
    reset(): ClassList {
        this.#classList.length = 0;
        this.#callCallbacks();
        return this;
    }
    resetAll(): ClassList {
        this.#classList.length = 0;
        this.#callbacks.length = 0;
        return this;
    }
}

export function modifyClass(...classStrings: string[]): ClassList {
    const classListInst = new ClassList(...classStrings);
    classListInst.enabledLogs = false;
    return classListInst;
}

export function modifyClassOnElements(selector: string, ...classStrings: string[]): ClassList {
    const elements = [...document.querySelectorAll(selector)];
    const classListInst = modifyClass(...classStrings);
    elements.forEach(el => {
        el.setAttribute('class', classListInst.toString());
    });
    classListInst.subscribe((classString) => {
        elements.forEach(el => {
            el.setAttribute('class', classString);
        });
    });
    return classListInst;
}