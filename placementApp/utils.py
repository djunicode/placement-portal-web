import xlwt
import datetime
import re

#############################
#   EXCEL SHEET GENERATION  #
#############################


def generate_xls(company):
    wb = xlwt.Workbook(encoding="utf-8")  # Creating Workbook

    positions = company.positions.all()
    for position in positions:
        # Creating separate sheets for each position
        wb = generate_sheet(wb, position)

    return wb


def generate_sheet(wb, position):
    sheet_title = get_valid_sheet_name(position.title)
    ws = wb.add_sheet(sheet_title)  # Creating sheet

    # Writing title of the sheet
    sheet_title = (
        "Applications for "
        + position.title
        + ", "
        + position.company.name
        + " "
        + str(get_curent_year())
    ).upper()
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    font_style.font.height = 300
    font_style.alignment.horz = 2
    ws.write_merge(0, 0, 0, 5, sheet_title, font_style)

    # Writing the column names
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    font_style.alignment.horz = 2
    columns = [
        "SAP ID",
        "Name of canditate",
        "Email address",
        "CGPA",
        "Status",
        "Submitted at",
    ]
    col_width = [
        13 * 260,
        26 * 260,
        30 * 260,
        7 * 260,
        23 * 260,
        18 * 260,
    ]

    row_num = 2
    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num].upper(), font_style)
        ws.col(col_num).width = col_width[col_num]

    # Writing data into the columns
    font_style = xlwt.XFStyle()
    rows = []
    applications = position.applications.filter(
        submitted_at__year=get_curent_year())
    for application in applications:
        date_time = application.submitted_at.strftime("%m/%d/%Y, %H:%M:%S")
        rows.append(
            [
                application.student.sap_ID,
                application.student.f_name + " " + application.student.l_name,
                application.student.email,
                application.student.pointer,
                application.get_status_display(),
                date_time,
            ]
        )
    for row in rows:
        row_num += 1
        for col_num in range(6):
            ws.write(row_num, col_num, row[col_num], font_style)

    return wb


def get_valid_sheet_name(position_title):
    # Replace invalid characters with _
    return re.sub('[\\/:?*\[\]\\\\]+', '_', position_title)

def get_valid_workbook_name(company_name):
    # Replace characters other than alphanumeric, spaces, hyphens and underscores
    return re.sub('[^A-Za-z0-9 _-]+', '_', company_name)

def get_curent_year():
    return datetime.date.today().year
