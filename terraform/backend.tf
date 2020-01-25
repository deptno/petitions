terraform {
  backend s3 {
    profile = "deptno"
    bucket = "deptno-tfstate"
    region = "ap-northeast-2"
    key = "ptt.tfstate"
    encrypt = true
  }
}
