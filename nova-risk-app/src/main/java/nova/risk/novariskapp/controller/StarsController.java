package nova.risk.novariskapp.controller;
import org.bson.types.ObjectId;
import nova.risk.novariskapp.model.Stars;
import nova.risk.novariskapp.repo.StarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@RestController
@RequestMapping("/Stars")
public class StarsController {
    private final StarsRepository starsRepository;

    @Autowired
    public StarsController(StarsRepository starsRepository) {
        this.starsRepository = starsRepository;
    }

    @GetMapping("")
    public ResponseEntity<Page<Stars>> index(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Stars> starsPage = starsRepository.findAll(pageRequest);
        return ResponseEntity.ok(starsPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stars> getStarById(@PathVariable String id) {
        Optional<Stars> star = starsRepository.findById(id);
        return star.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Stars create(@RequestBody Stars stars) {
        return starsRepository.save(stars);
    }

    @PutMapping("/{_id}")
    Stars update(@PathVariable String _id,@RequestBody Stars stars) throws Exception {

        Stars starsFromDb = starsRepository.findById(String.valueOf(_id)).orElseThrow(Exception::new);


        starsFromDb.setHip(stars.getHip());
        starsFromDb.setHd(stars.getHd());
        starsFromDb.setHr(stars.getHr());
        starsFromDb.setGl(stars.getGl());
        starsFromDb.setBf(stars.getBf());
        starsFromDb.setProper(stars.getProper());
        starsFromDb.setRa(stars.getRa());
        starsFromDb.setDec(stars.getDec());
        starsFromDb.setDist(stars.getDist());
        starsFromDb.setPmra(stars.getPmra());
        starsFromDb.setPmdec(stars.getPmdec());
        starsFromDb.setRv(stars.getRv());
        starsFromDb.setMag(stars.getMag());
        starsFromDb.setAbsmag(stars.getAbsmag());
        starsFromDb.setSpect(stars.getSpect());
        starsFromDb.setCi(stars.getCi());
        starsFromDb.setX(stars.getX());
        starsFromDb.setY(stars.getY());
        starsFromDb.setZ(stars.getZ());
        starsFromDb.setVx(stars.getVx());
        starsFromDb.setVy(stars.getVy());
        starsFromDb.setVz(stars.getVz());
        starsFromDb.setRarad(stars.getRarad());
        starsFromDb.setDecrad(stars.getDecrad());
        starsFromDb.setPmrarad(stars.getPmrarad());
        starsFromDb.setPmdecrad(stars.getPmdecrad());
        starsFromDb.setBayer(stars.getBayer());
        starsFromDb.setFlam(stars.getFlam());
        starsFromDb.setCon(stars.getCon());
        starsFromDb.setComp(stars.getComp());
        starsFromDb.setComp_primary(stars.getComp_primary());
        starsFromDb.setBase(stars.getBase());
        starsFromDb.setLum(stars.getLum());
        starsFromDb.setVar(stars.getVar());
        starsFromDb.setVar_min(stars.getVar_min());
        starsFromDb.setVar_max(stars.getVar_max());
        starsFromDb.setPSupernova(stars.getPSupernova());


        return starsRepository.save(starsFromDb);

    }

    @DeleteMapping("/{_id}")
    public ResponseEntity<?> deleteStar(@PathVariable ObjectId _id) {
        try {
            Stars star = starsRepository.findById(String.valueOf(_id)).orElse(null);

            if (star != null) {
                starsRepository.delete(star);
                return ResponseEntity.noContent().build(); // Solicitud exitosa (204 No Content)
            } else {
                return ResponseEntity.notFound().build(); // No se encontró la estrella (404 Not Found)
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Error interno del servidor (500 Internal Server Error)
        }
    }

    @GetMapping("/ClosestSupernovae")
    public ResponseEntity<Object> getClosestSupernovae() {
        // Consulta las estrellas que cumplen con los criterios en la base de datos
        List<Stars> stars = starsRepository.findBypSupernovaGreaterThanAndDistNotNullOrderByDistAsc(80.0);

        // Filtra las estrellas que tengan campos dist o pSupernova nulos o faltantes
        stars = stars.stream()
                .filter(star -> star.getDist() != null && star.getPSupernova() != null)
                .collect(Collectors.toList());

        // Limita la lista a las 100 estrellas más cercanas
        if (stars.size() > 1000) {
            stars = stars.subList(0, 1000);
        }

        return ResponseEntity.ok(stars);
    }


}
