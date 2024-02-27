interface IOption {
    [apiKey: string]: string;
}

interface IError {
    ok: boolean;
    status: number;
    statusText: string;
    json(): void;
}

interface ILoader {
    baseLink: string;
    options: IOption;
    getResp(first: { endpoint: string; options: object }, callback: (data?: void) => string): void;
    errorHandler(res: IError): IError;
    makeUrl(options: IOption, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data?: void) => void, options: IOption): void;
}

class Loader implements ILoader {

    public baseLink: string;

    public options: IOption;

    constructor(baseLink: string, options: IOption) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: object },
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: IError): IError {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: IOption, endpoint: string): string {
        const urlOptions: IOption = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: (data: void) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }

}

export default Loader;
