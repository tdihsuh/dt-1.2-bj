<template>
  <div class="login_wrap_apply">
    <div class="logo_div">
      <div class="logo_img" @click="toLogin"></div>
      <div class="logo_title" @click="toLogin"></div>
      <div class="logo_text_a" @click="toLogin">
        查尽天下失信行为
      </div>
      <a href="http://www.cycredit.com.cn/" class="logo_a">中青信用官网</a>
    </div>
    <div class="content">
      <div class="apply_title">
        <div class="apply_title_text">
          免费申请试用
        </div>
        <div class="apply_title_detail">
          联合认证／多头借贷／犯罪不良／金融反欺诈／失信行为服务
        </div>

      </div>
      <div class="apply_form">
        <div class="apply_form_title">
          欢迎免费申请试用
        </div>
        <div class="apply_form_title_text">
          请留下您的相关信息，我们会尽快与您联系
        </div>
        <Form ref="applyinfo" :model="applyinfo" :rules="ruleValidate" :label-width="180" label-position="left">
          <FormItem label="选择感兴趣的产品：" prop="apis" style="text-align: left;font-size: 14px;">
            <Row>
              <Col span="5">
              <div style="font-size: 14px">个人</div>
              <div style="font-size: 14px;margin-top: 34px;">企业</div>
              </Col>
              <Col span="18" offset="1">
              <CheckboxGroup v-model="applyinfo.apis">
                <Checkbox label="高法失信被执行人"></Checkbox>
                <Checkbox label="金融信贷逾期"></Checkbox>
                <br>
                <Checkbox label="犯罪不良信息核查"></Checkbox>
                <Checkbox label="多头借贷信息"></Checkbox>
                <br>
                <Checkbox label="企负面信息"></Checkbox>
              </CheckboxGroup>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="行业类型" prop="user_group">
            <Select v-model="applyinfo.user_group">
              <Option v-for="item in applyinfo.group" :value="item._id" :key="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="企业名称：" prop="company">
            <Input v-model="applyinfo.company" placeholder="请输入企业名称" size="large"/>
          </FormItem>
          <FormItem label="社会统一信用代码：" prop="identity_code">
            <Input v-model="applyinfo.identity_code" placeholder="请输入社会统一信用代码" size="large" :maxlength="18"/>
          </FormItem>
          <FormItem label="上传营业执照：" prop="photo_url">
            <div id="img_box" class="container" style="width: 90px;position: relative;cursor: pointer;">
              <img id="img" src="" style="height:150px;width:120px;border-color: #f0f0f0">
              <input type="hidden" name="token" v-model="applyinfo.photo_url">
              <Button type="primary" @click="show" style="width: 100px;position: absolute;left:150px;top:128px"
                      size="small" :disabled="applyinfo.photo_url==''">查看大图
              </Button>
            </div>
          </FormItem>
          <FormItem label="公司邮箱：" prop="email" style="position: relative;">
            <Input v-model="applyinfo.email" placeholder="公司邮箱将作为您登录系统的用户名并接收系统通知" size="large"/>
          </FormItem>
          <FormItem label="公网IP：" prop="uniform">
            <Input v-model="applyinfo.uniform" placeholder="请输入公网IP，多个IP地址用英文分号分割" size="large"/>
          </FormItem>
          <FormItem label="联系人姓名：" prop="username">
            <Input v-model="applyinfo.username" placeholder="请输入联系人姓名" size="large"/>
          </FormItem>
          <FormItem label="手机号：" prop="mobile">
            <Input v-model="applyinfo.mobile" placeholder="请输入手机号" size="large" :maxlength="11"/>
          </FormItem>
          <FormItem label="验证码：" prop="imgcode">
            <Row>
              <Col span="16">
              <Input type="text" v-model="applyinfo.imgcode" placeholder="请输入验证码" size="large" :maxlength="4"/>
              </Col>
              <Col span="7" offset="1">
              <div class="img" @click="imgcode">
                <div v-html="img"></div>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="手机验证码：" prop="telcode">
            <Row>
              <Col span="16">
              <Input type="text" v-model="applyinfo.telcode" placeholder="请输入手机验证码" size="large" :maxlength="6"/>
              </Col>
              <Col span="7" offset="1">
              <div :class="telclass" @click="telcode">
                {{text}}
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="">
            <div class="checkbox ">
              <Checkbox v-model="checkbox" style="font-size: 14px;margin-top: -20px;">
                我已阅读并同意
              </Checkbox>
              <span class="agreement" @click="modal = true">《黑猫察服务协议》</span>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('applyinfo')" style="width: 200px;" size="large">提交申请</Button>
          </FormItem>
          <Modal title="营业执照" v-model="visible" class="apply_modal">
            <img :src="url" v-if="visible" style="width: 100%">
          </Modal>
          <Modal
            title="《黑猫察服务协议》"
            v-model="modal"
            width="800"
            class="agreement_modal"
            @on-ok="checkbox = true"
          >
            <p>
              中青信用管理有限公司（以下简称“中青信用”或“本公司”），依据本协议通过黑猫察信用风险筛查系统（以下简称“黑猫察”）为用户（即使用黑猫察系统的“机构用户”，以下简称“用户”，包括法人及其他组织）提供服务，所有服务将按照本协议规则严格执行。黑猫察的所有权和运作权均属于依照中华人民共和国法律建立并存续，归中青信用所有。本协议是您和中青信用为明确服务内容及双方权利义务等而签订。您必须同意《黑猫察服务协议》
              （以下简称“本协议”）的全部条款，方可在本系统取得中青信用分配给您使用的服务管理账户。当您在点击确认“同意用户服务协议”或实际使用本系统提供的服务即代表您已充分理解本协议条款并同意接受协议内容。
            </p>
            <h4>一、合作目的</h4>
            <p>
              为进一步贯彻《国务院关于建立完善守信联合激励和失信联合惩戒制度加快推进社会诚信建设的指导意见》，建立起“发起—响应—反馈”机制，使失信者一处失信，处处受限，协议双方共同构建黑名单数据共享通道，以实现良币驱逐劣币效应，达到资源和资金向信用良好人群倾斜的目的。
            </p>
            <h4>二、合作内容</h4>
            <p>
              中青信用黑猫察信用风险筛查系统，为用户提供信息比对后的多维度黑名单数据、以协助信息使用方在行政审批、贷款风险筛查等业务操作时对信息主体进行充分判断、以避免信息使用方出现相关风险损失的同时，提高失信主体的交易成本，使失信主体失去交易资格、净化信用环境。
            </p>
            <h4>三、服务规则</h4>
            <p>
              1、为您创建黑猫察账户时，您需根据黑猫察要求提供法人或组织注册信息；
            </p>
            <p>
              2、您在本系统享有的账户及密码需设置专门的操作人员妥善保存，该账号、密码及信息指令的发出，不得擅自转借或授权第三方使用。本系统通过您的账户接受来自您的指令，无论您通过何种方式向本公司发出指令，都不可撤回或撤销，且视为您本人的指令。您账户项下、发出的指令及其造成的后果发生任何侵权、违约等责任的，由您自行负责并承担相应的责任。
            </p>
            <p>
              3、在您使用黑猫察服务，或访问黑猫察信用风险筛查系统网页时，黑猫察自动接收并记录的您的浏览器和计算机上的信息， 包括但不限于您的IP地址、访问日期和时间等数据。
            </p>
            <p>
              4、您一经注册即有权根据本协议及本系统的相应规则，参与本系统的相关活动并享受本系统提供的数据服务，本系统根据您的选择为您提供相应的数据记录服务。
            </p>
            <p>
              5、本系统有权在您未提供真实、准确、有效的信息时，暂停为您提供相关服务。
            </p>
            <p>
              6、若您有下列行为或可能为下列行为的，本系统有权在不通知您的前提下，删除或采取其他限制性措施处理如下信息：包括但不限于违反本协议约定的义务；以规避费用为目的；以信用滥用为目的；以非法获取他人信息牟利为目的；以合法方式掩盖非法目的等；存在欺诈等恶意或虚假内容；与网上交易无关或非以交易为目的；存在恶意竞价或其他试图扰乱正常交易秩序因素；违反公共利益或可能严重损害本系统、第三方合法权益。 
            </p>
            <p>
              7、黑猫察提供给您的信息，是基于黑猫察从第三方主体获得的信息整理而成，黑猫察对第三方向我们提供数据的真实性、准确性、可靠性、时效性及完整性不作任何明示或默示的保证、承诺或担保；黑猫察不因向您提供信用信息而承担任何您使用该信息而产生的利益损失或相应责任。
            </p>
            <h4>四、信息安全和保密条款</h4>
            <p>
              1、未经本系统书面同意，您不得将本系统的任何资料、信息另做它用；您亦不得将上述材料用作任何非法用途。
            </p>
            <p>
              2、未经信息或数据源提供方同意，您不得向任何第三方泄露因履行本协议所取得的信用信息及数据，无论是在合同执行过程中还是合同终止，但法律、法规另有规定或双方另有约定的除外。
            </p>
            <p>
              保密期限为长期。
            </p>
            <h4>五、违约责任</h4>
            <p>
              1、若您未能按约定日期支付中青信用服务费，中青信用有权要求您除支付服务费用及逾期利息外，加付每日拖欠服务费用总额的0.1%作为违约金。
            </p>
            <p>
              2、天灾或不可抗力导致延误等情况除外。
            </p>
            <p>
              3、双方应当严格遵守本协议之约定，一方违反约定而导致合作无法继续进行，则守约方有权立即终止本协议项下合作，并要求违约方承担违约责任。
            </p>
            <p>
              4、在协议履行期间所发生的一切差错、事故和案件，造成损失的，应由违约方承担赔偿责任。对于不可归因于两方的责任，双方应依照公平原则分担；因第三方原因造成损失的，双方应互相协助向该第三方追偿。
            </p>
            <p>
              5、若遇国家行政管理部门政策调整，或中华人民共和国工业和信息化部、中国人民银行的相关政策调整，对本协议的履行造成严重影响的，调整方应及时通知对方，由双方协商议定，如协商不能达成一致的，任何一方有权终止本协议。
            </p>
            <p>
              6、由于国家法律法规和监管政策的变化导致中青信用无法继续为您提供本协议项下的服务时，不视为中青信用违约。
            </p>
            <h4>六、信息获取条件</h4>
            <p>
              1、对于中青信用在本协议约定下提供的每笔信息查询服务，均视为您已获得信息主体的授权。您须履行取得被查询信息主体授权的义务，因授权引起的所有问题由您负责，并承担因此产生的相关法律责任。您向中青信用提供的查询服务依赖于您获得的信息主体的合法授权，您承担因获取授权方面的内容、方式或程序上的瑕疵给中青信用造成纠纷、诉讼、损失。
            </p>
            <p>
              2、您保证1款所述的信息主体授权具备可追溯性，应在本协议有效期内及本协议终止后保留授权发生的合理证据。中青信用有权经事先书面通知检查您取得授权的实际情况，您应积极配合证明本协议项下对信息主体相关信息的查询、使用、传送等处理行为的正当性与合法性。
            </p>
            <p>
              3、您对本协议项下信息主体相关信息的查询、使用、传送等行为不应超过其授权范围，如因涉及授权问题引发的纠纷，由您负责解决并承担相应的责任。
            </p>
            <p>
              4、任一事项变动可能对信息主体的授权造成影响的，您应基于相关法律法规规定判断授权变化情况并作如下处理：
            </p>
            <p>
              A:该等变动不影响您继续按照本协议的约定使用中青信用提供的服务的，您必须在变动事项发生后1日内以书面形式通知中青信用该变动情况；
            </p>
            <p>
              B:该等变动导致您无权继续按照本协议的约定使用中青信用提供的服务的，您必须在变动事项发生后1日内以书面形式通知中青信用，明确告知中青信用该等变动可能产生的影响，并立即中止使用中青信用的服务查询相应的信息主体的信息；
            </p>
            <p>
              C;该等变动导致您无权继续按照本协议的约定使用中青信用提供的服务，但您可通过其他补救措施重新获得合法有效的授权的，您应先按4条第一款履行通知义务，然后由双方协商后续处理方案。
            </p>
            <h4>七、协议更新</h4>
            <p>
              本系统有权根据需要不时地修改和补充本协议或各类规则，经修订和补充的各类规则，是本协议的组成部分。本协议及任何具体服务合同的任何更新都将以本系统公告或页面展示的方式向您告知。您在协议更新后仍使用登录本系统或使用本系统列明的任何服务的，视为您已同意并接受协议更新的内容。
            </p>
            <h4>八、协议期间及终止</h4>
            <p>
              1、由于不可抗力事件造成的本协议的不履行或迟延履行，任何一方均不对不可抗力范围内造成的损害对另外一方承担责任，除非不可抗力事件是发生于一方迟延履行其合同项下义务的期间。
            </p>
            <p>
              2、您充分理解并同意本系统无须就下述情况所导致服务无法正常提供时给您造成的各种影响或损失承担责任：
            </p>
            <p>
              1)系统维护、网站升级期间；
            </p>
            <p>
              2)电信故障；
            </p>
            <p>
              3)发生台风、地震、海啸、洪水、停电、战争、恐怖袭击、黑客攻击等事件造成本系统系统故障、服务中断或延迟的。
            </p>
            <h4>九、争议管辖</h4>
            <p>
              本协议相关的所有问题均受到中国大陆法律管辖。如果因为本协议产生任何争议，您同意由本公司住所地人民法院，即北京市海淀区人民法院管辖。
            </p>
          </Modal>
        </Form>

      </div>

    </div>
    <div class="footer">
      <div class="footer_item">中青信用管理有限公司</div>
      <div class="footer_item">地址：北京市海淀区致真大厦B座6层｜电话：010-59837372｜邮箱：service@cycredit.com.cn</div>
      <div class="footer_item ">京ICP备17002651号-3 <span class="footer_span_img"></span> 京公网安备 11010802024911号</div>
      <div class="footer_codeImg"></div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'login',
    mounted: function () {
      this.$store.commit('imgcode');
      this.$store.commit('userGroup');
      let that = this;
      let token;
      let key = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
      key = 'HMC' + key;
      console.log('key=' + key);
      axios.get('/api/v1/qiniu/token/' + key).then(function (res) {
        token = res.data;
        console.log('token1=' + token);
      }).catch(function (err) {
        console.log(err);
      });
      setTimeout(function () {
        let qq = qiniuOption("img_box", "img");
        let uploader = Qiniu.uploader(qq);
      }, 500);

      function qiniuOption(box, img_box) {
        return {
          runtimes: 'html5,flash,html4',    //上传模式,依次退化
          container: box,           //上传区域DOM ID，默认是browse_button的父元素，
          drop_element: box,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          browse_button: img_box,         // 上传选择的点选按钮，必需
          // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
          // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
          // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
          // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
          // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
          uptoken_func: function () {// 在需要获取uptoken时，该方法会被调用
            console.log('token2=' + token);
            return token

          },
          save_key: false,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
          domain: 'http://images.uniccat.com',   //bucket 域名，下载资源时用到，**必需**
          get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
          multi_selection: false,  //一次是否可以选择多个文件
          max_file_size: '10mb',           //最大文件体积限制
          flash_swf_url: '/js/plupload/Moxie.swf',  //引入flash,相 对路径
          max_retries: 1,                   //上传失败最大重试次数
          dragdrop: true,                   //开启可拖曳上传
          chunk_size: '0mb',                //分块上传时，每片的体积
          auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
          unique_names: false,      //设置所有文件名唯一
          filters: {
            mime_types: [ //只允许上传图片
              {title: "Image files", extensions: "jpg,jpeg,gif,png"},
            ],
            prevent_duplicates: false //不允许选取重复文件
          },
          deleteAfterDays: '',
          init: {
            'Key': function (up, file) {
              // do something with key
              return key;
            },
            'FilesAdded': function (up, files) {
              // 设置预览图地址
              let img = new o.Image();
              img.onload = function () {
                $("#" + img_box).attr('src', this.getAsDataURL());
                that.url = this.getAsDataURL();
              }
              img.load(files[0].getSource());

              plupload.each(files, function (file) {
                // 如果上传文件大于1 ps：第一个文件上传的时候用户选择第二个文件
                // 这时队列大于1，队列的第一个文件是正在上传的，第二个是新选的
                if (up.files.length > 1) {
                  // 移除当前队列里第一个文件
                  up.removeFile(up.files[0]);
                }
                // 文件添加进队列后,处理相关的事情
              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function (up, file) {
              // 当前进行的百分比up.total.percent
              // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function (up, file, info) {
              let domain = up.getOption('domain');
              let res = $.parseJSON(info);
              let sourceLink = domain + "/" + res.key; //获取上传成功后的文件的Url
              that.applyinfo.photo_url = sourceLink;
              console.log(sourceLink);
            },
            'Error': function (up, err, errTip) {
              if (err.message == "File extension error.") {
                alert("目前只支持图片格式：jpg,jpeg,gif,png");
              } else {
                alert("未知错误" + err.code + "：" + err.message);
              }
              console.log(err.code + ":" + err.message);
            },
            'UploadComplete': function () {
              //队列文件处理完毕后,处理相关的事情
            },
          }
        };
      }
    },
    data () {
      const isValidIP = function (ip) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        return reg.test(ip);
      };
      const validateIP = (rule, value, callback) => {
        if (value) {
          let arr = value.split(';');
          for (let i of arr) {
            if (i == '') {
              continue
            }
            if (!isValidIP(i)) {
              callback(new Error('IP格式不正确'));
              break
            }
          }
          callback()
        }
      };
      const validateTel = (rule, value, callback) => {
        let telReg = /^1[0-9]{10}$/i;
        if (!telReg.test(value)) {
          callback(new Error('手机号格式不正确'));
          return
        }
        axios.get('/api/v1/mobile/' + value).then(function (res) {
          console.log(res);
          let data = res.data;
          console.log('验证手机号存在');
          if (data.status == 0 || data.status == 1) {
            callback(new Error('手机号已存在'));
          } else {
            callback();
          }
        }).catch(function (err) {
          console.log(err.response);
          if (err.response.status == 503) {
            callback(new Error('系统正在升级，请稍后'));
          } else if (err.response.status == 400) {
            callback();
          }
          else {
            callback(new Error('网络出错了~~'));
          }
        });
      };
      return {
        text: '获取验证码',
        telclass: 'img telcode',
        url: '',
        checkbox: false,
        modal: false,
        visible: false,
        time: 60,
        ruleValidate: {
          user_group: [
            {required: true, message: '请选择行业类型', trigger: 'change'}
          ],
          company: [
            {required: true, message: '请输入企业名称', trigger: 'blur'}
          ],
          identity_code: [
            {required: true, message: '请输入社会统一信用代码', trigger: 'blur'},
            {type: 'string', min: 18, message: '请输入18位社会统一信用代码', trigger: 'blur'}
          ],
          photo_url: [
            {required: true, message: '请上传营业执照', trigger: 'change'}
          ],
          email: [
            {required: true, message: '请输入公司邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          uniform: [
            {required: true, message: '请输入公网IP', trigger: 'blur'},
            {validator: validateIP, trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {type: 'string', min: 11, message: '请输入11位手机号', trigger: 'blur'},
            {validator: validateTel, trigger: 'blur'}
          ],
          apis: [
            {required: true, type: 'array', min: 1, message: '请至少选择一项', trigger: 'change'}
          ],
          imgcode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {type: 'string', min: 4, message: '请输入4位验证码', trigger: 'blur'}
          ],
          telcode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
            {type: 'string', min: 6, message: '请输入6位手机验证码', trigger: 'blur'}
          ],
        }
      }
    },
    computed: mapGetters(
      [
        'applyinfo',
        'img'
      ]
    ),

    methods: {
      toLogin(){
        this.$store.commit('toLogin');
      },
      show(){
        this.visible = true;
      },
      handleSubmit (name) {
        if (!this.checkbox) {
          this.$Message.info('您尚未同意《黑猫察服务协议》');
          return
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.commit('apply');
          } else {
            this.$Message.error('提交失败，请检查您所填写的信息!');
          }
        })
      },
      imgcode(){
        this.$store.commit('imgcode');
      },
      telcode(){
        let that = this;
         this.$refs.applyinfo.validateField('mobile', function (err) {
          if (!err) {
            if (!that.applyinfo.imgcode) {
              that.$Message.error('请输入图片验证码');
              return
            }
            if (that.time == 60) {
              that.time = 0;
              that.$store.commit('telcode');
              let num = 60;
              that.telclass = 'img telcode_no';
              that.text = '60秒后重新获取';
              let time = setInterval(function () {
                let second = --num;
                let str = second + '秒后重新获取';
                that.text = str;
                that.time = second;
                if (second == 0 || that.applyinfo.flag) {
                  that.applyinfo.flag = false;
                  that.time = 60;
                  that.text = '获取验证码';
                  that.telclass = 'img telcode';
                  clearInterval(time);
                }
              }, 1000);

            }
          }
        });


      }


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .login_wrap_apply {
    width: 100%;
    height: 100%;
    .logo_div {
      height: 80px;
      width: 100%;
      padding-top: 14px;
      text-align: left;
      position: fixed;
      background-color: #fff;
      color: #5f96ff;
      z-index: 11;
      .logo_img {
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-left: 32px;
        background: url('../assets/image/login.png') no-repeat center;
        background-size: contain;
      }
      .logo_title {
        display: inline-block;
        width: 80px;
        height: 42px;
        margin-left: 1%;
        background: url('../assets/image/text2.png') no-repeat center;
        background-size: contain;
      }
      .logo_text_a {
        display: inline-block;
        border-radius: 100px;
        margin-left: 1%;
        width: 128px;
        color: #000;
        height: 26px;
        line-height: 23px;
        font-size: 16px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
      }
      .logo_text {
        display: inline-block;
        border-radius: 100px;
        margin-left: 1%;
        color: #000;
        width: 98px;
        height: 26px;
        line-height: 23px;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
      }
      .logo_a {
        display: inline-block;
        position: absolute;
        height: 26px;
        line-height: 23px;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
        right: 20px;
        border: 1px solid #5f96ff;
        border-radius: 2px;
        width: 98px;
      }
    }
    .content {
      min-height: 80%;
      padding-top: 80px;
      position: relative;
      .apply_title {
        width: 100%;
        height: 250px;
        background: url('../assets/image/apply.png');
        background-size: cover;
        background-position: top;
        text-align: center;
        .apply_title_text, .apply_title_detail {
          color: #ffffff;
          letter-spacing: 0px;
          text-align: center;
        }
        .apply_title_text {
          font-size: 40px;
          padding-top: 74px;
        }
        .apply_title_detail {
          font-size: 14px;
        }
      }
      .apply_form {
        width: 60%;
        max-width: 800px;
        min-width: 600px;
        height: auto;
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        .apply_form_title {
          padding-top: 40px;
          color: #353842;
          font-size: 24px;
        }
        .apply_form_title_text {
          font-size: 12px;
          color: #9094a4;
          padding-top: 6px;
          padding-bottom: 20px;
        }

      }
      .img {
        width: 100%;
        height: 34px;
        cursor: pointer;
        font-size: 14px;
      }
      .telcode {
        border: 1px solid #5f96ff;
        border-radius: 3px;
        color: #5f96ff;
      }
      .telcode_no {
        border: 1px solid #b2b2b2;
        border-radius: 3px;
        color: #b2b2b2;
      }

      .ivu-carousel {
        height: 100%;
        .ivu-carousel-list {
          height: 100% !important;
          .ivu-carousel-track {
            height: 100% !important;
            .ivu-carousel-item {
              height: 100% !important;
            }
            .demo-carousel1 {
              width: 100%;
              height: 100% !important;
              background: url('../assets/image/1.jpg') no-repeat center;
              background-size: cover;
            }
            .demo-carousel2 {
              width: 100%;
              height: 100% !important;
              background: url('../assets/image/2.jpg') no-repeat center;
              background-size: cover;
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      height: 20%;
      min-height: 240px;
      text-align: center;
      background-color: #fafafa;
      font-size: 14px;
      color: #6a6f83;
      letter-spacing: 0px;
      padding-top: 20px;
      .footer_item {
        margin-top: 10px;
      }
      .footer_span_img {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/image/beianlogo.png') no-repeat 48% 50%;
        background-size: contain;
        vertical-align: top;
      }
      .footer_codeImg {
        width: 100px;
        height: 100px;
        background: url('../assets/image/wx.png') no-repeat center;
        background-size: cover;
        margin: 10px auto 0;
      }
    }
  }

  .ivu-modal-footer {
    display: none !important;
  }

  .checkbox {
    width: 100%;
    margin: -12px auto;
    text-align: left;
    .agreement {
      color: #2d8cf0;
      font-size: 14px;
      margin-left: -10px;
      cursor: pointer;
    }
  }

  #img_box:before {
    position: absolute;
    content: '上传营业执照';
    width: 80px;
    top: 60px;
    left: 24px;
    color: #cacaca;
  }


</style>
