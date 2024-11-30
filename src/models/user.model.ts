export class User {
    id?: number;
    name: string;
    id_wallet: string | null;

    constructor(name: string = '', id_wallet: string) {
        this.name = name;
        this.id_wallet = id_wallet;
    }
}
