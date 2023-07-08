declare interface IItem {
    category: "movies" | "tv";
    data: IMovie;
}

declare interface IActorItem {
    data: IActorDetails;
}