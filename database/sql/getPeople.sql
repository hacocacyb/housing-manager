select p.*,
  exists(select v."Id"
    from "Visit" v
    where p."Id" = v."PersonId"
    and v."Intake" < now()
    and (v."Outtake" is null or v."Outtake" > now())
  ) as "Visiting"
from "Person" p
