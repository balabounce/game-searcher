interface IStoreObjBody {
    domain: string,
    games_count: number,
    id: number,
    image_background: string,
    name: string,
    slug: string
}

export interface IStoreObj {
    id: number,
    store: IStoreObjBody,
    url: string
}

export interface IPlatform {
    platform: {
        id: number,
        name: string,
        slug: string
    }
}

export interface IScreen {
    height: number,
    id: number,
    image: string,
    is_deleted: boolean,
    width: number
}
