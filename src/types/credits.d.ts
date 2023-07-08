interface IActorDetails {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id?: number;
    character: string;
    credit_id: string;
    order: number;
}

interface ICreditsResponse {
    id?: number;
    credits?: IActorDetails[];
    cast?: IActorDetails[];
}

interface ICredits {
    id?: number;
    cast: IActorDetails[];
}