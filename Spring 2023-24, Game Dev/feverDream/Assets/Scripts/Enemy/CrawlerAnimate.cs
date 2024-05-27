using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CrawlerAnimate : MonoBehaviour
{
    private Animator crawlerAnimator;
    
    private double AttackDist = 5;
    private int MoveDist = 25;
    
    public GameObject player;
    
    // Start is called before the first frame update
    void Start()
    {
        crawlerAnimator = GetComponent<Animator>();
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist)
        {
            if (Vector3.Distance(transform.position, player.transform.position) <= AttackDist)
            {
                if (crawlerAnimator is null) return;
                if (!crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("pounce"))
                {
                    crawlerAnimator.SetTrigger("isPouncing");   
                }
            }
            else
            {
                if (crawlerAnimator is null) return;
                if (!crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("crawl") && !crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("crawl_fast"))
                {
                    crawlerAnimator.SetTrigger("isRunning");
                }
            }
        }
        else
        {
            if (crawlerAnimator is null) return;
            if (!crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("idle"))
            {
                crawlerAnimator.SetTrigger("isIdle");
            }
        }
    }
}
