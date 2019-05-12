package ubi.core.citychallenge3.integrations.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ubi.core.citychallenge3.integrations.dto.PointsRequest;
import ubi.core.citychallenge3.integrations.services.CitySlotsService;

import java.util.Map;

@RestController(value="/cityslots/")
public class CitySlotsController {

    @Autowired
    CitySlotsService citySlotsService;

    @GetMapping(value = "/points/")
    public Map<String,Double> getPoints(@RequestParam String playerId){
        return citySlotsService.getPoints(playerId);
    }

    @PostMapping(value = "/points/")
    public Map<String,Double> changePoints(@RequestBody PointsRequest rq){
        return citySlotsService.changePoints(rq);
    }
}
