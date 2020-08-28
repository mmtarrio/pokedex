"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var container = document.getElementById("app");
var numberOfPokemons = 151;
var fetchData = function (cb) { return __awaiter(void 0, void 0, void 0, function () {
    var i, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                i = 1;
                _b.label = 1;
            case 1:
                if (!(i <= numberOfPokemons)) return [3 /*break*/, 4];
                _a = cb;
                return [4 /*yield*/, getPokemon(i)];
            case 2:
                _a.apply(void 0, [_b.sent()]);
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var fetchData2 = function (cb) { return __awaiter(void 0, void 0, void 0, function () {
    var pokemons, i, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pokemons = new Array(numberOfPokemons);
                for (i = 1; i <= numberOfPokemons; i++) {
                    pokemons[i] = getPokemon(i);
                }
                _a = cb;
                return [4 /*yield*/, Promise.all(pokemons)];
            case 1:
                _a.apply(void 0, [(_b.sent()).sort(function (a, b) { return a.id - b.id; })]);
                return [2 /*return*/];
        }
    });
}); };
var getPokemon = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, pokemon, pokemonType, transformedPokemon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/" + id)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                pokemon = _a.sent();
                pokemonType = pokemon.types
                    .map(function (poke) { return poke.type.name; })
                    .join(", ");
                transformedPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: "" + pokemon.sprites.front_default,
                    type: pokemonType,
                };
                return [2 /*return*/, transformedPokemon];
        }
    });
}); };
var presentPokemons = function (pokemons) {
    pokemons.forEach(function (value) { return showPokemon(value); });
};
var showPokemon = function (pokemon) {
    var output = "\n        <div class=\"card\">\n            <span class=\"card--id\">#" + pokemon.id + "</span>\n            <img class=\"card--image\" src=" + pokemon.image + " alt=" + pokemon.name + " />\n            <h1 class=\"card--name\">" + pokemon.name + "</h1>\n            <span class=\"card--details\">" + pokemon.type + "</span>\n        </div>\n    ";
    container.innerHTML += output;
};
fetchData(showPokemon);
//fetchData2(presentPokemons);
