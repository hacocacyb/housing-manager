select p.*,
  exists(select v.id
    from visit v
    where p.id= v."personId"
    and v.intake < now()
    and (v.outtake is null or v.outtake > now())
  ) as visiting
from person p
order by last
