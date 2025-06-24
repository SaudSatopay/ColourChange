$(document).ready(function () {
    function showInput(type) {
        $('body').css({
            backgroundColor: 'white',
            backgroundImage: 'none'

        });

        if (type === 'color') {
            $('#colorInputGroup').show();
            $('#imageInputGroup').hide();
        } else {
            $('#colorInputGroup').hide();
            $('#imageInputGroup').show();
        }
    }

    function isValidColor(str) {
        const s = new Option().style;
        s.color = str;
        return s.color !== '';
    }

    $('#radioColor').change(() => showInput('color'));
    $('#radioImage').change(() => showInput('image'));

    $('#colorPicker').on('input', function () {
        $('#cname').val($(this).val());
    });

    $('#applyBtn').click(function () {
        const selectedOption = $('input[name="Background"]:checked').val();

        $('body').css({
            backgroundColor: 'white',
            backgroundImage: 'none'
        });
        $('#preview').hide();

        if (!selectedOption) {
            alert("Please select any one of the INPUTS'");
            return;
        }

        if (selectedOption === 'color') {
            const userInput = $('#cname').val().trim();
            if (!userInput) {
                alert("The color box mustn't be empty.");
                return;
            }
            if (!isValidColor(userInput)) {
                alert("Please enter a valid color name or hex code.");
                return;
            }
            $('body').css('backgroundColor', userInput);
        }

        if (selectedOption === 'image') {
            const file = $('#img')[0].files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $('body').css('backgroundImage', `url(${e.target.result})`);
                    $('#preview').attr('src', e.target.result).show();
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please select a valid image file.");
            }
        }
    });

    showInput('color');
    $('#radioColor').prop('checked', true);
});
