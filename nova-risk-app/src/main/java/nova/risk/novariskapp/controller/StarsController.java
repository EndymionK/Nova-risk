package nova.risk.novariskapp.controller;
import org.springframework.web.bind.annotation.RestController;
import nova.risk.novariskapp.model.Stars;
import nova.risk.novariskapp.repo.StarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Stars")


public class StarsController {
    private final StarsRepository starsRepository;
    @Autowired
    public StarsController(StarsRepository starsRepository) {
        this.starsRepository = starsRepository;
    }
    @GetMapping("")
    List<Stars> index(){
        return starsRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Stars create(@RequestBody Stars stars){

        return starsRepository.save(stars);

    }

    @PutMapping("{id}")
    Stars update(@PathVariable String id,@RequestBody Stars stars) throws Exception {

        Stars starsFromDb = starsRepository.findById(id).orElseThrow(Exception::new);

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

        starsFromDb.setCompletado(stars.isCompletado());

        return starsRepository.save(starsFromDb);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id) throws Exception {

        Stars stars = starsRepository.findById(id).orElseThrow(Exception::new);
        starsRepository.delete(stars);
    }
}
