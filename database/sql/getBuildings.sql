select *,
(Select count(*) from "Bed" where "Bed"."BuildingId" = b."Id") as "BedCount",
(select count(*) from "Visit" v
  where v."BuildingId" = b."Id"
  and v."Intake" < now()
  and (v."Outtake" is null or v."Outtake" > now())
) as "Occupied"

from "Building" b
