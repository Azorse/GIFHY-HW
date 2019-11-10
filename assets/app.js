var startingBands = ['Depeche Mode', 'Echo and the Bunnymen', 'New Order', 'Flock of Seagulls', 'Tears for Fears'];
            var pastLookup = [];



            $.each(startingBands, function(i, val) {
                $('#startingButtons').append(`<button class="btn btn-secondary" data-band="${startingBands[i]}">${startingBands[i]}</button>`)
            });

            
            $('#submit').on('click', function() {
                
                var newBand = [];
                var userInput = $('#band').val()

                if (pastLookup.includes(userInput)) {
                    alert('This already exists.')
                } else {
                    pastLookup.push(userInput);
                    newBand.push(userInput);
                    
                
                    $.each(newBand, function(i, val) {
                        $('#newButtons').attr({'data-band': userInput}).append(`<button class="btn btn-secondary">${userInput}</button>`)
                    });
                }
            });

            $('.btn-secondary').on('click', function() {
                var band = $(this).attr("data-band");
                

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                band + "&api_key=fFByprtufVI2weoaxWgbrIcP2PJfZIa7&limit=10";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function(response) {
                        console.log(response)
                        var results = response.data;

                        for (var i = 0; i < results.length; i++) {
                            if (results[i].rating !== "r") {
                                
                            var gifDiv = $('<div>');
                            var rating = results[i].rating;
                            var title = results[i].title;
                            var source = results[i].source;
                            var p = $('<p>').text(`Rating: ${rating}`);
                            var t = $('<p>').text(`Title: ${title}`);
                            // var s = $('<p>').text(`Source: ${source}`);
                            var bandImage = $('<img id="bandGif">');

                            bandImage.addClass('gif')
                            bandImage.attr({
                                'data-static':results[i].images.fixed_height_still.url, 
                                'data-animate': results[i].images.fixed_height.url,
                                'src': results[i].images.fixed_height_still.url,
                                'data-state': 'still'
                            })
                           
                            gifDiv.append(t);
                            gifDiv.append(p);
                            // gifDiv.append(s);
                            gifDiv.append(bandImage);
                            
                            

                            $('#newGifs').prepend(gifDiv);
                            
                          }
                      }
                  })
            
            });

            $('#newButtons').on('click', function() {
                var band = $(this).attr("data-band");

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                band + "&api_key=fFByprtufVI2weoaxWgbrIcP2PJfZIa7&limit=10";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function(response) {
                        console.log("new" + response)
                        var results = response.data;

                        for (var i = 0; i < results.length; i++) {
                            if (results[i].rating !== "r") {
                                
                            var gifDiv = $('<div>');
                            var rating = results[i].rating;
                            var title = results[i].title;
                            // var source = results[i].source;
                            var p = $('<p>').text(`Rating: ${rating}`);
                            var t = $('<p>').text(`Title: ${title}`);
                            // var s = $('<p>').text(`Source: ${source}`);
                            var bandImage = $('<img id="bandGif">');

                            bandImage.addClass('gif')
                            bandImage.attr({
                                'data-static':results[i].images.fixed_height_still.url, 
                                'data-animate': results[i].images.fixed_height.url,
                                'src': results[i].images.fixed_height_still.url,
                                'data-state': 'still'
                            })


                            gifDiv.append(t);
                            gifDiv.append(p);
                            // gifDiv.append(s);
                            gifDiv.append(bandImage);
                            

                            $('#newGifs').prepend(gifDiv);
                            
                          }
                      }
                  })
            
            });

            $('#clear').on('click', function() {
                $('#newGifs').empty();
            })

            $('#newGifs').on('click', '.gif', function(event) {
                event.preventDefault;
                
                var state = $(this).attr('data-state');
                
                if (state === "still") {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr('data-static'));
                    $(this).attr('data-state', 'still');
                }
            });