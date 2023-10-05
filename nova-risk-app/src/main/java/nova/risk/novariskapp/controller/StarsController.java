package nova.risk.novariskapp.controller;

import nova.risk.novariskapp.model.Stars;
import nova.risk.novariskapp.repo.StarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/Stars")
public class StarsController {

    @Autowired
    private_StarsRepository starsRepository;
    @GetMapping("")
    List<Stars> index{
        return StarsRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Stars create(@RequestBody Stars stars){

        return StarsRepository.save(stars);

    }
}
