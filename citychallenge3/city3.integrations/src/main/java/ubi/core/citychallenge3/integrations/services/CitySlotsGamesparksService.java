package ubi.core.citychallenge3.integrations.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import ubi.core.base.gamesparks.GameSparksService;
import ubi.core.citychallenge3.integrations.dto.PointsRequest;

import java.util.HashMap;
import java.util.Map;

@Controller
public class CitySlotsGamesparksService {
    @Autowired
    GameSparksService gameSparksService;


    public Map<String, Double> getPoints(String playerId) {
        return gameSparksService.getPoints(playerId);
    }

    public Map<String, Double> changePoints(PointsRequest rq) {
        return gameSparksService.debitOrCreditPoints(rq.getPlayerId(),rq.getCurrency(),rq.getAmount());
    }
}
