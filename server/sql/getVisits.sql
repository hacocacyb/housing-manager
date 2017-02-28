select v.*,
	p.first, p.last,
  bl.name as "buildingName", bed.name as "bedName"

from visit v
left outer join person p on v."personId" = p."id"
left outer join building bl on v."buildingId" = bl.id
left outer join bed bed on v."bedId" = bed.id

order by v.intake desc
