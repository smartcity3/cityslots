package ubi.core.citychallenge3.integrations.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import ubi.core.citychallenge3.integrations.dto.PointsRequest;

import java.util.Map;

@Controller
public class CitySlotsService {
    @Autowired
    CitySlotsGamesparksService citySlotsGamesparksService;


    public Map<String, Double> getPoints(String playerId) {
        return citySlotsGamesparksService.getPoints(playerId);
    }

    public Map<String, Double> changePoints(PointsRequest rq) {
        return citySlotsGamesparksService.changePoints(rq);
    }
}
