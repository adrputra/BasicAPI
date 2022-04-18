//const animals = [
//    { name: "garfield", species: "cat", class: { name: "mamalia" } },
//    { name: "nemo", species: "fish", class: { name: "invertebrata" } },
//    { name: "tom", species: "cat", class: { name: "mamalia" } },
//    { name: "garry", species: "cat", class: { name: "mamalia" } },
//    { name: "dory", species: "fish", class: { name: "invertebrata" } }
//];

//let OnlyCat = [];

//for (var i = 0; i < animals.length; i++) {
//    if (animals[i].species == "cat") {
//        OnlyCat.push(animals[i]);
//    }
//}
//console.log(OnlyCat);

//for (var i = 0; i < animals.length; i++) {
//    if (animals[i].species == "fish") {
//        animals[i].class.name = "non-mamalia"
//    }
//}
//console.log(animals);
//StarWars();
//Pokemon();

function StarWars() {
    $.ajax({
        url: "https://swapi.dev/api/people/",
        success: function (result) {
            console.log(result);
            var data = "";
            $.each(result.results, function (key, val) {
                data += `<tr>
                            <th scope="row">${key + 1}</th>
                            <td>${val.name}</td>
                            <td>${val.height}</td>
                            <td>${val.mass}</td>
                            <td>${val.hair_color}</td>
                            <td>${val.skin_color}</td>
                            <td>${val.gender}</td>
                            <td>${val.birth_year}</td>
                        </tr>`
            });
            $("#dataSW").html(data);
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function Pokemon() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0",
        success: function (result) {
            //console.log(result);
            var data = "";
            $.each(result.results, function (key, val) {
                data += `<tr>
                            <th scope="row">${key + 1}</th>
                            <td>${val.name}</td>
                            <td><button type="button" class="btn btn-primary" data-toggle="modal" onclick="PokemonData('${val.url}')" data-target="#pokemonModal">Detail</button></td>
                        </tr>`
            });
            $("#dataPokemon").html(data);
        }
    });
}

function Ability(url) {
    $.ajax({
        url: url,
        success: function (result) {
            if (result.effect_entries[0].language.name == "en") {
                $(".ability-effect").attr('data-content', `${result.effect_entries[0].effect}`)
            }
            else {
                $(".ability-effect").attr('data-content', `${result.effect_entries[1].effect}`)
            }
        }
    })
}

function LocationEncounters(url) {
    $.ajax({
        url: url,
        success: function (loc) {
            let location = "";
            $.each(loc, function (key, val) {
                let word = val.location_area.name.split('-')
                console.log(word)
                let area = "";
                for (var i = 0; i < word.length; i++) {
                    area += capitalizeFirstLetter(word[i]) + " ";
                }
                location += `<li class="list-group-item">${area}</li>`
            })
            $(".location").html(location)
        }
    });
}

function PokemonData(url) {
    $.ajax({
        url: url,
        success: function (result) {
            //console.log(result.sprites.other['official-artwork'].front_default);

            $(".headline").html(`${capitalizeFirstLetter(result.name)}<small class="text-muted" >#${('00' + result.id).slice(-5)}</small>`)


            //$(".id").html(`#${('0' + result.id).slice(-3)}`)

            $(".pic").attr('src', `${result.sprites.other['official-artwork'].front_default}`)

            let types = "";
            $.each(result.types, function (key, val) {
                switch (val.type.name) {

                    case "bug":
                        colorCode = "#729F3F";
                        break;
                    case "dragon":
                        colorCode = "#FF0000";
                        break;
                    case "fairy":
                        colorCode = "#FDB9E9";
                        break;
                    case "fire":
                        colorCode = "#FD7D24";
                        break;
                    case "ghost":
                        colorCode = "#7B62A3";
                        break;
                    case "ground":
                        colorCode = "#AB9842";
                        break;
                    case "normal":
                        colorCode = "#A3ABAE";
                        break;
                    case "psychic":
                        colorCode = "#F366B9";
                        break;
                    case "steel":
                        colorCode = "#9EB7B8";
                        break;
                    case "dark":
                        colorCode = "#707070";
                        break;
                    case "fighting":
                        colorCode = "#D56723";
                        break;
                    case "poison":
                        colorCode = "#B97FC9";
                        break;
                    case "rock":
                        colorCode = "#A38C21";
                        break;
                    case "water":
                        colorCode = "#4592C4";
                        break;
                    case "grass":
                        colorCode = "#9BCC50";
                        break;
                    case "electric":
                        colorCode = "#EED535";
                        break;
                    case "ice":
                        colorCode = "#51C4E7";
                        break;
                    case "unknown":
                        colorCode = "#89256b";
                        break;
                    case "shadow":
                        colorCode = "#333333";
                        break;
                    case "flying":
                        colorCode = "#a9e1f2";
                        break;

                }

                types += `<span class="badge badge-success mr-2" style="background-color: ${colorCode}">${capitalizeFirstLetter(val.type.name)}</span>`

            })
            $(".types").html(types)

            $(function () {
                $('[data-toggle="popover"]').popover()
            })
            let ability = "";
            $.each(result.abilities, function (key, val) {
                ability += `<button type="button" class="btn btn-sm btn-info ability-effect mr-2" data-toggle="popover" title="Ability Info" onclick="Ability('${val.ability.url}')" data-content="">${capitalizeFirstLetter(val.ability.name)}</button>`
            })
            $(".ability").html(ability)

            $(".hp").attr('style', `width:${(result.stats[0].base_stat) * 100 / 150}%`)
            $(".hp").html(`Health Point : ${result.stats[0].base_stat}`)

            $(".attack").attr('style', `width:${(result.stats[1].base_stat) * 100 / 150}%`)
            $(".attack").html(`Attack Point : ${result.stats[1].base_stat}`)

            $(".defense").attr('style', `width:${(result.stats[2].base_stat) * 100 / 150}%`)
            $(".defense").html(`Defense Point : ${result.stats[2].base_stat}`)

            $(".special-attack").attr('style', `width:${(result.stats[3].base_stat) * 100 / 150}%`)
            $(".special-attack").html(`Special Attack Point : ${result.stats[3].base_stat}`)

            $(".special-defense").attr('style', `width:${(result.stats[4].base_stat) * 100 / 150}%`)
            $(".special-defense").html(`Special Defense Point : ${result.stats[4].base_stat}`)

            $(".speed").attr('style', `width:${(result.stats[5].base_stat) * 100 / 150}%`)
            $(".speed").html(`Speed Point : ${result.stats[5].base_stat}`)

            $(".height").html(`${result.height} Inch`)
            $(".weight").html(`${result.weight} Lbs`)


            LocationEncounters(result.location_area_encounters)
        }
    });
}

$(document).ready(function () {
    $('.table-pokemon').DataTable({
        search: {
            return: true
        }
    });
});

$(document).ready(function () {
    $('.table-test').DataTable({
        "filter": true,
        "orderMulti": false,
        "ajax": {
            //"url": "https://swapi.dev/api/people/",
            "url": "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0",
            "datatype": "json",
            "dataSrc": "results"
        },
        "columns": [
            {
                "data": null,
                "name": "no",
                "autoWidth": false,
                "render": function (data, type, row, meta) {
                    return meta.row+1;
                }
            },
            {
                "data": "name",
                "render": function (data, type, row) {
                    return capitalizeFirstLetter(row['name']);
                }
            },
            {
                "data": "url",
                "render": function (data, type, row) {
                    //render berfungsi utk membuat column bisa kita manipulasi string nya
                    return `<button type="button" class="btn btn-primary" data-toggle="modal" onclick="PokemonData('${row['url']}')" data-target="#pokemonModal">Detail</button>`;
                },
                "autoWidth": true
            }
        ]
    });
});

