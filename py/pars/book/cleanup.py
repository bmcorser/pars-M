import subprocess
from pars.sqla import Session
from pars import models as m

images = [
    'pars/a6faebb2a64aeabe78bf66ead090c4918cae6921_7',
    'pars/000rk60q',
    'pars/3383260824_4055dcc397',
    'pars/ss-2-320-480-160-0-7ea0768337a4761ba3979a96a89157e45acb06ed_1',
    'pars/xvE5jK5011402156344_001c_v001_zp',
    'pars/2IsVaT',
    'pars/W4XSiRimages',
    'pars/vF4TeWurl',
    'pars/oXI_nyAT241243',
    'pars/wtN8zySatellite',
    'pars/TN5_6rimage',
    'pars/TxOQxmNorth20Korean20leader20Kim20Jong-Un20L20looks20at20food20at20a20kitchen20of20a20mess20hall-749215',
    'pars/ZNqvZitumblr_l7xqyhWda81qd7hay',
    'pars/TamDLSimages',
    'pars/E10XwF6a01053659f647970b0120a52c169f970b-800wi',
    'pars/H7Qoqxspin_prod_105441701',
    'pars/GMJPk1images',
    'pars/qazPLp6GED0_AS01',
    'pars/bWZlik6GED7_AS01',
    'pars/jzXBTR628954311',
    'pars/T2av3ZT210-1B',
    'pars/JlM7zl525',
    'pars/9FUpQiMPW-65285',
    'pars/7N3IW2trl_01_img0055',
    'pars/ng_VfSimages',
    'pars/11WZ1qbilde',
    'pars/qzHY9Wbcf3c21ce05cfb6788e25dcc3821b3c7',
    'pars/4NZe3y1500x500',
]

type_extension = {
    'JPEG': 'jpg',
    'GIF': 'gif',
    'PNG': 'png',
}

S = Session()

root = '/Users/ben/work/originalenclosure-backup/media/'

for parimage in S.query(m.ParImage).filter(m.ParImage.image.in_(images)).all():
    file_cmd = ['file', '-b', root + parimage.image]
    type_string = str(subprocess.check_output(file_cmd), 'utf8')
    extension = type_extension.get(type_string.split()[0])
    if not extension:
        continue
    subprocess.check_call(['cp', root + parimage.image, root + parimage.image + '.' + extension])
    parimage.image = "{0}.{1}".format(parimage.image, extension)
    S.add(parimage)

S.flush()
S.commit()
