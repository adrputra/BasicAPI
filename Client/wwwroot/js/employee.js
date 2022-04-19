$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

Validate()
DatePicker()
MasterData()
//University()

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InJpY2FyZG9hbmRyYTE3QGdtYWlsLmNvbSIsInJvbGVzIjpbIkVtcGxveWVlIiwiRGlyZWN0b3IiXSwiZXhwIjoxNjQ5ODI1NTQ3LCJpc3MiOiJBUEkifQ.CQ5yhIdNN_ESfx4thu9GnJO6dIIQEF1-NBvax25a9dY";

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
}

function Validate() {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}

function MasterData() {
    $(document).ready(function () {
        $('#master-data').DataTable({
            processing: true,
            serverSide: true,
            "filter": true,
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.childRow
                }
            },
            "orderMulti": false,
            "ajax": {
                "url": "getmaster/",
                "type": "GET",
                "datatype": "json",
                "dataSrc": "result"
            },
            "columns": [
                {
                    "data": null,
                    "name": "no",
                    "autoWidth": true,
                    "render": function (data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                {
                    "data": "nik",
                    "autoWidth": true

                },
                {
                    "data": "fullName",
                    "autoWidth": true

                },
                {
                    "data": "gender"
                },
                {
                    "data": "phone",
                    "render": function (data, type, row, meta) {
                        if (row['phone'][0] == "0") {
                            let render = "+62" + row['phone'].substring(1)
                            return render;
                        }
                        else {
                            return row['phone'];
                        }

                    }
                },
                {
                    "data": "birthDate",
                    "render": function (data, type, row) {
                        let a = row['birthDate'].split('T')[0];
                        var date = new Date(a.split('-')[0], a.split('-')[1], a.split('-')[2]);
                        return moment(date).format('D MMMM Y');
                    }
                },
                {
                    "data": "email"
                },
                {
                    "data": "salary",
                    "render": function (data, type, row) {
                        return formatRupiah(row['salary'])
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row) {
                        return `<span data-toggle="tooltip" data-placement="bottom" title="Edit">
                                    <button type="button" class="btn btn-primary btn-sm btn-circle inline" data-toggle="modal" data-target=".update-modal" onclick="GetForUpdate(${row['nik']})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

                                </span>
                                <button type="button" class="btn btn-danger btn-sm btn-circle" data-toggle="tooltip" data-placement="bottom" title="Delete" onclick="Delete(${row['nik']},${row['educationId']})"><i class="fa fa-trash" aria-hidden="true"></i></button>`;
                    },
                    "orderable": false,
                    "autoWidth": true

                }

            ],
            dom: "<'row'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'B><'col-sm-12 col-md-4'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            columnDefs: [
                {
                    targets: -1,
                    className: 'action'
                }
            ],
            buttons: [
                {
                    extend: 'pdf',
                    exportOptions: {
                        columns: ':not(.action)'
                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: ':not(.action)'
                    }
                }
            ],
        });
    });
}

function DatePicker() {
    $(document).ready(function () {
        var date_input = $('input[name="date"]'); //our date input has the name "date"
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        var options = {
            format: 'yyyy-mm-dd',
            container: container,
            todayHighlight: true,
            autoclose: true,
        };
        date_input.datepicker(options);
    })
}

function University() {
    $.ajax({
        url: "../university/getall",
        success: function (result) {
            var data = "";
            $.each(result, function (key, val) {
                data += `<option value="${val.id}">${val.name}</option>`
            })
            $('#university').html(data);
            $('#universityU').html(data);
        }
    });
}

function Register() {
    //event.preventDefault();
    let input = new Object();

    input.FirstName = $("#firstName").val();
    input.LastName = $("#lastName").val();
    input.Phone = $("#phone").val();
    input.BirthDate = $("#date").val();
    input.Salary = $("#salary").val();
    input.Email = $("#email").val().toLowerCase();
    input.Gender = parseInt($("input[name='gender']:checked").val());
    input.Password = $("#password").val();
    input.Degree = $("#degree").val();
    input.GPA = $("#gpa").val();
    input.UniversityId = parseInt($("#university").val());

    $.ajax({
        type: "POST",
        url: "register/",
        data: input,
        success: function (msg) {
            console.log("Success", JSON.stringify(input))
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed", JSON.stringify(input))
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
        }
    });
}

function Delete(nik, educationId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `../employee/Delete/${nik}`,
                success: function (result) {
                    console.log(`Success data ${nik} deleted.`)
                    $.ajax({
                        type: "DELETE",
                        url: `../education/Delete/${educationId}`,
                        success: function (result) {
                            console.log(`Success education ${educationId} deleted.`)
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
                        }
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
                }
            })
            Swal.fire(
                'Deleted!',
                'Data has been deleted.',
                'success'
            )
        }
    })
}

function GetForUpdate(nik) {
    University()
    $.ajax({
        type: "GET",
        url: `getmasterid?nik=${nik}`,
        headers: {
            Authorization: "Bearer " + token
        },
        success: function (result) {
            console.log(result)
            $.each(result.result, function (key, val) {
                $('#firstNameU').attr('value', `${(val.fullName).split(' ')[0]}`)
                $('#lastNameU').attr('value', `${(val.fullName).split(' ')[1]}`)
                $('#phoneU').attr('value', `${val.phone}`)
                $('#dateU').attr('value', `${(val.birthDate).split('T')[0]}`)
                $('#emailU').attr('value', `${val.email}`)
                $('#salaryU').attr('value', `${val.salary}`)
                $('#gpaU').attr('value', `${val.gpa}`)
                $('#universityU').attr('value', `${val.UniversityId}`)
                $('.update-modal #update').attr('onclick', `Update(${val.nik},${val.educationId})`)
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed Get Data for Update!',
            })
        }
    })
}

function Update(nik, educationId) {
    let updateEMP = new Object();
    let updatePass = new Object();
    let updateEdu = new Object();

    updateEMP.NIK = `${nik}`;
    updateEMP.FirstName = $("#firstNameU").val();
    updateEMP.LastName = $("#lastNameU").val();
    updateEMP.Phone = $("#phoneU").val();
    updateEMP.BirthDate = $("#dateU").val();
    updateEMP.Salary = $("#salaryU").val();
    updateEMP.Email = $("#emailU").val().toLowerCase();
    updateEMP.Gender = parseInt($("input[name='genderU']:checked").val());
    //updatePass.Password = $(".update-modal #password").val();
    updateEdu.Id = educationId;
    updateEdu.Degree = $("#degreeU").val();
    updateEdu.GPA = $("#gpaU").val();
    updateEdu.UniversityId = parseInt($("#universityU").val());

    Swal.fire(
        'Data Employee Edited!',
        'Successfully',
        'success'
    )
    setTimeout(function () {
        location.reload();
    }, 2000);

    $.ajax({
        type: "PUT",
        url: `../employee/updateNIK/`,
        data: updateEMP,
        success: function (msg) {
            console.log("Success Update Employee", JSON.stringify(updateEMP))
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(updateEMP)
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed Update Employee!',
            })
        }
    });

    $.ajax({
        type: "PUT",
        url: `../education/updateEdu/`,
        data: updateEdu,
        success: function (msg) {
            console.log("Success Update Education", JSON.stringify(updateEdu))
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed", JSON.stringify(updateEdu))
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed Update Education!',
            })
        }
    });
}

Chart()
function Chart() {
    $.ajax({
        type: "GET",
        url: `../university/getall`,
        success: function (result) {
            let univ = {}
            $.each(result, function (key, val) {
                univ[val.name] = 0
            })
            console.log(univ)

            $.ajax({
                processing: true,
                serverSide: true,
                type: "GET",
                url: "getmaster/",
                //headers: {
                //    Authorization: "Bearer " + token
                //},
                success: function (result) {
                    console.log(result)
                    let Male = (result.result).filter(x => x.gender === "Male");
                    let Female = (result.result).filter(x => x.gender === "Female");
                    $.each(result.result, function (key, val) {
                        univ[val.universityName] = univ[val.universityName] + 1
                    })

                    //var Male = $.grep(gender, function (val) {
                    //    return val === 'Male';
                    //}).length;

                    //var Female = $.grep(gender, function (val) {
                    //    return val === 'Female';
                    //}).length;

                    var optionsGender = {
                        series: [Male.length, Female.length],
                        labels: ['Male', 'Female'],
                        chart: {
                            type: 'donut',
                            height: 'auto',
                            toolbar: {
                                show: true,
                            },
                            export: {
                                csv: {
                                    filename: undefined,
                                    columnDelimiter: ',',
                                    headerCategory: 'category',
                                    headerValue: 'value',
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toDateString()
                                    }
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }]
                    };

                    let listUnivName = []
                    $.map(univ, function (value, key) {
                        listUnivName.push([key])
                    });

                    var optionsUniv = {
                        series: [{
                            data: $.map(univ, function (value, index) {
                                return value;
                            })
                        }],
                        chart: {
                            type: 'bar',
                            height: 'auto',
                            events: {
                                click: function (chart, w, e) {
                                    // console.log(chart, w, e)
                                }
                            }
                        },
                        //colors: colors,
                        plotOptions: {
                            bar: {
                                columnWidth: '45%',
                                distributed: true,
                            }
                        },
                        dataLabels: {
                            enabled: true
                        },
                        legend: {
                            show: false
                        },
                        xaxis: {
                            categories: listUnivName,
                            labels: {
                                style: {
                                    //colors: colors,
                                    fontSize: '12px'
                                }
                            }
                        },
                        yaxis: {
                            logBase: 10,
                            tickAmount: 2
                        }
                    };

                    var genderChart = new ApexCharts(document.querySelector("#gender-chart"), optionsGender);
                    var univChart = new ApexCharts(document.querySelector("#univ-chart"), optionsUniv);

                    genderChart.render();
                    univChart.render();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Failed Gender Chart", XMLHttpRequest, textStatus, errorThrown)
                }
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
        }
    })
}

$(document).ready(function () {
    $("#hide-password span").on('click', function (event) {
        event.preventDefault();
        if ($('#hide-password input').attr("type") == "text") {
            $('#hide-password input').attr('type', 'password');
            $('#hide-password i').addClass("fa-eye-slash");
            $('#hide-password i').removeClass("fa-eye");
        } else if ($('#hide-password input').attr("type") == "password") {
            $('#hide-password input').attr('type', 'text');
            $('#hide-password i').removeClass("fa-eye-slash");
            $('#hide-password i').addClass("fa-eye");
        }
    });
});