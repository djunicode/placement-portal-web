

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(blank=True, max_length=40, null=True)),
                ('f_name', models.CharField(max_length=20)),
                ('l_name', models.CharField(max_length=20)),
                ('profile_image', models.ImageField(blank=True, default='profile_images/default.png', null=True, upload_to='profile_images')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('role', models.CharField(choices=[('STUDENT', 'Student'), ('CO', 'Co-ordinator'), ('TPO', 'TPO')], max_length=7)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('category', models.CharField(choices=[('S', 'Super Dream'), ('D', 'Dream'), ('R', 'Regular')], max_length=1)),
                ('link', models.URLField()),
            ],
            options={
                'verbose_name_plural': 'companies',
            },
        ),
        migrations.CreateModel(
            name='Coordinator',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('department', models.CharField(choices=[('COMPS', 'Computer'), ('IT', 'Information Technology'), ('EXTC', 'Electronics & Telecommunication'), ('PROD', 'Production'), ('MECH', 'Mechanical'), ('BIO', 'Biomedical'), ('ELEX', 'Electronics'), ('CHEM', 'Chemical'), ('HUM', 'Science & Humanities')], max_length=5)),
            ],
            options={
                'abstract': False,
            },
            bases=('placementApp.user',),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('sap_ID', models.CharField(default=None, max_length=12, unique=True, validators=[django.core.validators.RegexValidator(message='SAP ID must be valid', regex='^\\+?6?\\d{10,12}$')])),
                ('department', models.CharField(choices=[('COMPS', 'Computer'), ('IT', 'Information Technology'), ('EXTC', 'Electronics & Telecommunication'), ('PROD', 'Production'), ('MECH', 'Mechanical'), ('BIO', 'Biomedical'), ('ELEX', 'Electronics'), ('CHEM', 'Chemical')], max_length=5)),
                ('year', models.CharField(choices=[('TE', 'Third Year'), ('BE', 'Fourth Year')], max_length=2)),
                ('pointer', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
            ],
            options={
                'abstract': False,
            },
            bases=('placementApp.user',),
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('vacancies', models.IntegerField(default=0)),
                ('interview_date', models.DateTimeField()),
                ('deadline', models.DateTimeField()),
                ('package', models.CharField(max_length=128)),
                ('details', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='positions', to='placementApp.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('1', 'Put Under Review'), ('2', 'Scheduled For Interview'), ('3', 'Selected'), ('4', 'Rejected')], default='1', max_length=1)),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('position', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='placementApp.Position')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='placementApp.Student')),
            ],
            options={
                'unique_together': {('student', 'position')},
            },
        ),
    ]
